package com.asib27.authentication.Locations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Locations")
public class LocationController {

    @Autowired
    LocationService locationService;

    @PostMapping("/add")
    public String addNewLocation(@RequestBody Location location) {
        locationService.addLocation(location);
        return "New location added!! ";
    }

    @GetMapping("/get")
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    @DeleteMapping("/delete/{location_id}")
    public String deleteLocation(@PathVariable Long location_id) {
        locationService.deleteLocation(location_id);
        return "Location deleted !!";
    }
}
