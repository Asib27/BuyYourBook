package com.asib27.authentication.UserCloned;

import com.asib27.authentication.Locations.Location;
import com.asib27.authentication.Locations.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userCloned")
public class UserClonedController {

    @Autowired
    UserClonedService userClonedService;

    @Autowired
    LocationService locationService;

    @PostMapping("/add")
    public String addUser(@RequestBody UserCloned user){
        userClonedService.addNewUser(user);
        return "new user added";
    }

    @GetMapping("/get")
    public List<UserCloned> getAllUsers(){
        return userClonedService.getAllUsers();
    }

    @GetMapping("/get/{userid}")
    public UserCloned getAnUser(@PathVariable Long userid){
        return userClonedService.getAnUser(userid);
    }

    @GetMapping("/get/currentUser")
    public UserCloned getCurrentUser(){
        return userClonedService.getCurrentUser();
    }


    @PostMapping("/add/{userid}/Location/{locationid}")
    public UserCloned addLocation(@PathVariable Long userid, @PathVariable Long locationid){
        UserCloned user = userClonedService.getAnUser(userid);
        Location location = locationService.getALocation(locationid);
        user.setLocation(location);
        return userClonedService.addNewUser(user);
    }
    @PostMapping("/add/{user_id}/follows/{id}")
    public UserCloned follower(@PathVariable Long user_id, @PathVariable Long id){
        UserCloned user = userClonedService.getAnUser(user_id);
        UserCloned user1 = userClonedService.getAnUser(id);

        user.whomFollows(user1);
        return userClonedService.addNewUser(user);
    }

}
