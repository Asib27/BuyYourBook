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
        return userClonedService.getAllUers();
    }

    @GetMapping("/get/{userid}")
    public UserCloned getAnUser(@PathVariable Long userid){
        return userClonedService.getAnUer(userid);
    }

    @PostMapping("/add/{userid}/Location/{locationid}")
    public UserCloned addLocation(@PathVariable Long userid, @PathVariable Long locationid){
        UserCloned user = userClonedService.getAnUer(userid);
        Location location = locationService.getALocation(locationid);
        user.setLocation(location);
        return userClonedService.addNewUser(user);
    }

}
