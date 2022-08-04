package com.asib27.authentication.Transaction;


import com.asib27.authentication.Book.Book;
import com.asib27.authentication.Locations.Location;
import com.asib27.authentication.Payment.Payment;
import com.asib27.authentication.UserCloned.UserCloned;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table(name = "Transaction")
@Entity
public class Transaction{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tx_id")
    private Long id;


    @ManyToMany
    @JoinTable(name = "Books_in_transaction",
            joinColumns = @JoinColumn(name = "tx_id"),
            inverseJoinColumns = @JoinColumn(name = "isbn")
    )
    private Set<Book>booksInTransaction = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id",  referencedColumnName = "userid")
    private UserCloned user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id",  referencedColumnName = "payment_id")
    private Payment payment;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;


    public Transaction() {
    }

    public Set<Book> getBooksInTransaction() {
        return booksInTransaction;
    }

    public void addBook(Book book) {
        booksInTransaction.add(book);
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

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
