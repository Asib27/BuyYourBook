package com.asib27.authentication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.asib27.authentication.models.RefreshToken;
import com.asib27.authentication.models.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{
    @Override
    Optional<RefreshToken> findById(Long id);
    Optional<RefreshToken> findByToken(String token);

    @Modifying
    int deleteByUser(User user);
}
