package com.asib27.authentication.Locations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {
    @Autowired
    LocationRepository locationRepository;

    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

    public List<Location> getLocations() {
        return locationRepository.findAll();
    }

    public void deleteLocation(Long location_id) {
        boolean exists = locationRepository.existsById(location_id);

        if(exists)
            locationRepository.deleteById(location_id);
        else
            throw new IllegalStateException("Location_id does not exist ");
    }

    public Location getALocation(Long locationId) {
        boolean exists = locationRepository.existsById(locationId);

        if(exists)
            return locationRepository.findById(locationId).get();
        else
            throw new IllegalStateException("Location_id does not exist ");
    }
}

