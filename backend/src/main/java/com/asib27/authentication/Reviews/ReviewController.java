package com.asib27.authentication.Reviews;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/add")
    public String addNewReview(@RequestBody Review review){
        reviewService.addNewReview(review);
        return "new review added";
    }

    @GetMapping("/get/{id}")
    public Review getReviewById(@PathVariable Long id){
        return reviewService.getReview(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteReviewById(@PathVariable Long id){
        reviewService.deleteReview(id);
        return "review deleted !!";
    }


}
