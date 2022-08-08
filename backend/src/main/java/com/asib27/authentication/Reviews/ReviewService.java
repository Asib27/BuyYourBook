package com.asib27.authentication.Reviews;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public float getAvgRatingByBookName(Long id) {

        return reviewRepository.getAvgRatingByBookName(id);
    }

    public int getReviewCountByBookName(Long id) {
        return reviewRepository.getReviewCountByBookName(id);
    }

    public List<Object[]> getRatingPercentage(Long id) {
        return reviewRepository.getRatingPercentage(id);
    }

    public List<Review> getReviewByBookId(Long book_id) {
        return reviewRepository.getReviewByBookId(book_id);
    }

    public List<Review> getRandomReviews(Long id, int no) {
        return reviewRepository.getRandomReviews(id, no);
    }

    public List<Review> getMixedReviews(Long id, int no) {
        return reviewRepository.getMixedReviews(id, no);
    }
}
