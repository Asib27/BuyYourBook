package com.asib27.authentication.UserCloned;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserClonedService {

    @Autowired
    UserClonedRepository userClonedRepository;

    public UserCloned addNewUser(UserCloned user){
        return userClonedRepository.save(user);
    }

    public List<UserCloned> getAllUers() {
        return userClonedRepository.findAll();
    }

    public UserCloned getAnUer(Long userid) {
        boolean exists = userClonedRepository.existsById(userid);
        if(!exists){
            throw new IllegalStateException("no user found");
        }else{
            return userClonedRepository.findById(userid).get();
        }

    }
}
