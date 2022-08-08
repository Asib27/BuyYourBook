package com.asib27.authentication.Reviews;

import com.asib27.authentication.Book.Book;
import com.asib27.authentication.UserCloned.UserCloned;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Table(name = "reviews")
@Entity(name = "reviews")
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
            name = "review",
            length = 500
    )
    private String review_text;

    @Column(
            name = "rating"
    )
    private int rating;

    @Column(
            name = "addDate"
    )
    private Timestamp addDate;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id", referencedColumnName = "isbn")
    private Book book;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userid")
    private UserCloned userCloned;

    public Review(int upvotes, int downvotes, String review_text, int rating, Timestamp addDate) {
        this.upVotes = upvotes;
        this.downVotes = downvotes;
        this.review_text = review_text;
        this.rating = rating;
        this.addDate = addDate;
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

    public int getRating() {
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

    public void setRating(int rating) {
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

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Timestamp addDate) {
        this.addDate = addDate;
    }
}
