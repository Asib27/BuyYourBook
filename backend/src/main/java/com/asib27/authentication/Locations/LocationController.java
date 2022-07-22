package com.asib27.authentication.Locations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Locations")
public class LocationController {

    @Autowired
    LocationService locationService;

    @PostMapping("/addLocation")
    public String addNewLocation(@RequestBody Location location) {
        locationService.addLocation(location);
        return "New location added!! ";
    }

    @GetMapping("/findLocations")
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    @DeleteMapping("/deleteLocation/{location_id}")
    public String deleteLocation(@PathVariable Long location_id) {
        locationService.deleteLocation(location_id);
        return "Location deleted !!";
    }
}
