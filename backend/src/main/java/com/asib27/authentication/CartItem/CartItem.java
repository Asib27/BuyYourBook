package com.asib27.authentication.CartItem;


import com.asib27.authentication.Book.Book;
import com.asib27.authentication.UserCloned.UserCloned;

import javax.persistence.*;

@Table(name = "cart_item")
@Entity(name = "cart_item")
public class CartItem{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserCloned user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private Integer quantity;


    public CartItem(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public UserCloned getUser() {
        return user;
    }

    public void setUser(UserCloned user) {
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
