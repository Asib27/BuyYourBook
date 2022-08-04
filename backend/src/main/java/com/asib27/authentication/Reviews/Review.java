package com.asib27.authentication.Reviews;

import javax.persistence.*;

@Table(name = "reviews")
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "review_id"
    )
    private Long id;

    @Column(
            name = "upvotes"
    )
    private int upVotes;

    @Column(
            name = "downvotes"
    )
    private int downVotes;

    @Column(
            name = "rating"
    )
    private float rating;

    public Review(int upvotes, int downvotes, float rating) {
        this.upVotes = upvotes;
        this.downVotes = downvotes;
        this.rating = rating;
    }

    public Review() {
    }

    public Long getId() {
        return id;
    }

    public int getUpvotes() {
        return upVotes;
    }

    public int getDownvotes() {
        return downVotes;
    }

    public float getRating() {
        return rating;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUpvotes(int upvotes) {
        this.upVotes = upvotes;
    }

    public void setDownvotes(int downvotes) {
        this.downVotes = downvotes;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }
}
