package com.asib27.authentication.Cart;

import com.asib27.authentication.Book.Book;
import com.asib27.authentication.UserCloned.UserCloned;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table(name = "Cart")
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userid")
    private UserCloned user;

    @ManyToMany
    @JoinTable(name = "CartBook",
            joinColumns = @JoinColumn(name = "cart_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private Set<Book> cartBooks = new HashSet<>();

    public Cart() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserCloned getUser() {
        return user;
    }

    public void setUser(UserCloned user) {
        this.user = user;
    }

    public Set<Book> getCartBooks() {
        return cartBooks;
    }

    public void addBook(Book book) {
        cartBooks.add(book);
    }
}