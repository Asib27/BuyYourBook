package com.asib27.authentication.Book;


import javax.persistence.*;

@Table(name = "books")
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(
            name = "isbn"
    )
    private Long id;

    @Column(
            name = "name",
            nullable = false,
            length = 100
    )
    private String name;

    @Column(
            name= "edition",
            nullable = false
    )
    private int edition;

    @Column(
            name = "language",
            nullable = false,
            length = 50
    )
    private String language;
    @Column(
            name = "genre",
            nullable = false,
            length = 50
    )
    private String genre;

    @Column(
            name = "price",
            nullable = false
    )
    private int price;

    @Column(
            name = "quantity_available",
            nullable = false
    )

    private int quantity_available;

    public Book() {
    }

    public Book(String name, int edition,
                String language, String genre, int price,
                int quantity_available) {
        this.name = name;
        this.edition = edition;
        this.language = language;
        this.genre = genre;
        this.price = price;
        this.quantity_available = quantity_available;
    }



    public Book(Long isbn, String name, int edition,
                String language, String genre, int price,
                int quantity_available) {
        this.id = isbn;
        this.name = name;
        this.edition = edition;
        this.language = language;
        this.genre = genre;
        this.price = price;
        this.quantity_available = quantity_available;
    }

    public Long getIsbn() {
        return id;
    }

    public void setIsbn(Long isbn) {
        this.id = isbn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getEdition() {
        return edition;
    }

    public void setEdition(int edition) {
        this.edition = edition;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQuantity_available() {
        return quantity_available;
    }

    public void setQuantity_available(int quantity_available) {
        this.quantity_available = quantity_available;
    }



}
