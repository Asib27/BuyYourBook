package com.asib27.authentication.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.asib27.authentication.exception.TokenRefreshException;
import com.asib27.authentication.models.ERole;
import com.asib27.authentication.models.RefreshToken;
import com.asib27.authentication.models.Role;
import com.asib27.authentication.models.User;
import com.asib27.authentication.payload.request.LoginRequest;
import com.asib27.authentication.payload.request.SignupRequest;
import com.asib27.authentication.payload.request.TokenRefreshRequest;
import com.asib27.authentication.payload.response.JwtResponse;
import com.asib27.authentication.payload.response.MessageResponse;
import com.asib27.authentication.payload.response.TokenRefreshResponse;
import com.asib27.authentication.repository.RoleRepository;
import com.asib27.authentication.repository.UserRepository;
import com.asib27.authentication.security.jwt.JwtUtils;
import com.asib27.authentication.security.services.RefreshTokenService;
import com.asib27.authentication.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    RefreshTokenService refreshTokenService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

        String refreshToken = refreshTokenService.createRefreshToken(userDetails.getId()).getToken();
        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest req){
        String requestRefreshToken = req.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshToken::getUser)
            .map(user -> {
            String token = jwtUtils.generateTokenFromUsername(user.getUsername());
            return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
            })
            .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                "Refresh token is not in database!"));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest req){
        if(userRepository.existsByUsername(req.getUsername())){
            return ResponseEntity.badRequest().body(
                new MessageResponse("Error: Username is already taken")
            );
        }

        if(userRepository.existsByEmail(req.getUsername())){
            return ResponseEntity.badRequest().body(
                new MessageResponse("Error: Email is already in use")
            );
        }

        User user = new User(req.getUsername(), req.getEmail(),
                    encoder.encode(req.getPassword()));
        
        Set<String> strRoles = req.getRole();
        Set<Role> roles = new HashSet<>();

        if(strRoles == null){
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(()-> new RuntimeException("Error: ROLE USER is not found"));
            roles.add(userRole);
        }
        else{
            strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);
					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
        }

        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered succesfully"));
    }



}