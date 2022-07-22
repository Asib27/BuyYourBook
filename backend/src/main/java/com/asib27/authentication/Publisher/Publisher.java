package com.asib27.authentication.Publisher;

import com.asib27.authentication.Book.Book;
import com.asib27.authentication.Locations.Location;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table(name = "publisher")
@Entity
public class Publisher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String name;


    @JsonIgnore
    @OneToMany(mappedBy = "publisher")
    private Set<Book> publishedBooks = new HashSet<>();


    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    public Publisher(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Publisher(String name) {
        this.name = name;
    }

    public Publisher() {
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
    public Set<Book> getPublishedBooks() {
        return publishedBooks;
    }

    public void addLocation(Location location){
        this.location = location;
    }

    public Location getLocation() {
        return location;
    }
}
