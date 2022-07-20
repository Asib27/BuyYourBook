package com.asib27.authentication.Writer;

import com.asib27.authentication.Book.Book;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table(name = "authors")
@Entity
public class Writer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToMany(mappedBy = "writersOfTheBook")
    private Set<Book>writtenBooks = new HashSet<>();

    @Column(
            name = "name",
            length = 200,
            nullable = false
    )
    private String name;
    @Column(
            name = "email",
            unique = true,
            length = 255
    )
    private String email;

    public Writer(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public Writer() {
    }

    public Writer(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Book> getWrittenBooks() {
        return writtenBooks;
    }
}
