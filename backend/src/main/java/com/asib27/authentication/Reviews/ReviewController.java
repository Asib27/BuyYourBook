package com.asib27.authentication.Reviews;

import com.asib27.authentication.Book.Book;
import com.asib27.authentication.Book.BookService;
import com.asib27.authentication.UserCloned.UserCloned;
import com.asib27.authentication.UserCloned.UserClonedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;
    @Autowired
    BookService bookService;
    @Autowired
    UserClonedService userClonedService;

    @PostMapping("/add")
    public String addNewReview(@RequestBody Review review){
        reviewService.addNewReview(review);
        return "new review added";
    }

    @GetMapping("/get/all/{book_name}")
    public List<Review> getReViewByBookName(@PathVariable String book_name){
        Long x = bookService.getBookIdByName(book_name);
        return reviewService.getReviewByBookId(x);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteReviewById(@PathVariable Long id){
        reviewService.deleteReview(id);
        return "review deleted !!";
    }

    @PostMapping("/add/{review_id}/book/{book_id}")
    public Review addReviewToBook(@PathVariable Long review_id, @PathVariable Long book_id){
        Review review = reviewService.getReview(review_id);
        Book book = bookService.getBook(book_id);
        review.setBook(book);
        return reviewService.addNewReview(review);
    }
    @PostMapping("/add/{review_id}/user/{user_id}")
    public Review addReviewToUser(@PathVariable Long review_id, @PathVariable Long user_id){
        Review review = reviewService.getReview(review_id);
        UserCloned user = userClonedService.getAnUser(user_id);
        review.setUserCloned(user);
        return reviewService.addNewReview(review);
    }

    @PostMapping("/add/{review_id}/up")
    public Review upVoteReview(@PathVariable Long review_id){
        Review review = reviewService.getReview(review_id);
        review.setUpvotes(review.getUpvotes()+1);
        return reviewService.addNewReview(review);
    }

    @PostMapping("/add/{review_id}/down")
    public Review downVoteReview(@PathVariable Long review_id){
        Review review = reviewService.getReview(review_id);
        review.setDownvotes(review.getDownvotes() + 1);
        return reviewService.addNewReview(review);
    }

    @GetMapping("/get/average_rating/{book_name}")
    public float getAvgRatingByBookName(@PathVariable String book_name){
        Long id = bookService.getBookIdByName(book_name);
        System.out.println(book_name + " has book_id " + id);
        float x =  reviewService.getAvgRatingByBookName(id);
        System.out.println("average rating " + x);
        return x;
    }
    @GetMapping("/get/review_count/{book_name}")
    public int getReviewCountByBookName(@PathVariable String book_name){
        Long id = bookService.getBookIdByName(book_name);
        int x =  reviewService.getReviewCountByBookName(id);
        return x;
    }

    @GetMapping("/get/rating_percentage/{book_name}")
    public Map<Integer, String> getRatingPercentage(@PathVariable String book_name){
        Long id = bookService.getBookIdByName(book_name);
        List<Object[]> result = reviewService.getRatingPercentage(id);
        Map<Integer, String> map = new HashMap();
        for(Object[] x:result){
            map.put((Integer) x[0], x[1].toString());
        }

        return map;
    }

    @GetMapping("/get/random/{book_name}/{no}")
    public List<Review> getRandomReviews(@PathVariable String book_name, @PathVariable int no){
        Long id = bookService.getBookIdByName(book_name);
        return reviewService.getRandomReviews(id, no);
    }
    @GetMapping("/get/mixed/{book_name}/{no}")
    public List<Review> getMixedReviews(@PathVariable String book_name, @PathVariable int no){
        Long id = bookService.getBookIdByName(book_name);
        return reviewService.getMixedReviews(id, no);
    }




}
