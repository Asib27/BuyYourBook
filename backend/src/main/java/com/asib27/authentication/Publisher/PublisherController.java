package com.asib27.authentication.Publisher;

import com.asib27.authentication.Locations.Location;
import com.asib27.authentication.Locations.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publisher")
public class PublisherController {

    @Autowired
    PublisherService publisherService;
    @Autowired
    LocationService locationService;

    @PostMapping("/addPublisher")
    public String addNewPublisher(@RequestBody Publisher publisher){
        publisherService.addPublisher(publisher);
        return "new publisher added !!";

    }

    @GetMapping("/getPublishers")
    public List<Publisher> getAllPublishers(){
        return publisherService.getAllPublishers();
    }

    @PostMapping("/{publisherId}/inLocation/{locationId}")
    public Publisher addPublisherInLocation(@PathVariable Long publisherId, @PathVariable Long locationId){

        Publisher publisher = publisherService.getPublisher(publisherId);
        Location location = locationService.getALocation(locationId);
        publisher.addLocation(location);
        return publisherService.addPublisher(publisher);
    }


}


