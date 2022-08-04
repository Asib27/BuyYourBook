package com.asib27.authentication.Reviews;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public Review addNewReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review getReview(Long id) {
        boolean exist = reviewRepository.existsById(id);
        if(!exist){
            throw new IllegalStateException("review does not exist !!");
        }
        else{
            return reviewRepository.findById(id).get();
        }
    }

    public void deleteReview(Long id) {
        boolean exist = reviewRepository.existsById(id);
        if(!exist){
            throw new IllegalStateException("review does not exist !!");
        }else{
            reviewRepository.deleteById(id);
        }
    }
}
