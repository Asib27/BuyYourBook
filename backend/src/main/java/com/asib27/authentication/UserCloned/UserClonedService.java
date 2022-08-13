package com.asib27.authentication.UserCloned;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserClonedService {

    @Autowired
    UserClonedRepository userClonedRepository;


    public UserCloned addNewUser(UserCloned user){
        return userClonedRepository.save(user);
    }

    public List<UserCloned> getAllUsers() {
        return userClonedRepository.findAll();
    }

    public UserCloned getAnUser(Long userid) {
        boolean exists = userClonedRepository.existsById(userid);
        if(!exists){
            throw new IllegalStateException("no user found");
        }else{
            return userClonedRepository.findById(userid).get();
        }

    }

    public String getUserName(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public UserCloned getCurrentUser(){
        String name = getUserName();
        Long id = userClonedRepository.findUserId(name);
        System.out.println("User id is : "+ id);
        return getAnUser(id);
    }
}
