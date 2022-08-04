package com.asib27.authentication.Reviews;

import com.asib27.authentication.Book.Book;
import com.asib27.authentication.UserCloned.UserCloned;

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

    @Column(
            name = "review",
            length = 500
    )
    private String review_text;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id", referencedColumnName = "isbn")
    private Book book;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userid")
    private UserCloned userCloned;

    public Review(int upvotes, int downvotes, String review_text, float rating) {
        this.upVotes = upvotes;
        this.downVotes = downvotes;
        this.review_text = review_text;
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
    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public UserCloned getUserCloned() {
        return userCloned;
    }

    public void setUserCloned(UserCloned userCloned) {
        this.userCloned = userCloned;
    }

    public String getReview_text() {
        return review_text;
    }

    public void setReview_text(String review_text) {
        this.review_text = review_text;
    }
}
