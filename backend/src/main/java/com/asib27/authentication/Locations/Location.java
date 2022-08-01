package com.asib27.authentication.Locations;


import com.asib27.authentication.Publisher.Publisher;
import com.asib27.authentication.UserCloned.UserCloned;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table(name = "Locations")
@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            nullable = false,
            length = 200,
            name = "street_address"
    )
    private String street;

    @Column(
            nullable = false,
            length = 10,
            name = "postal_code"
    )
    private String postal_code;
    @Column(
            nullable = false,
            length = 50,
            name = "district"
    )
    private String District;

    public Location(String street, String postal_code, String district) {
        this.street = street;
        this.postal_code = postal_code;
        District = district;
    }

    public Location(Long id, String street, String postal_code, String district) {
        this.id = id;
        this.street = street;
        this.postal_code = postal_code;
        District = district;
    }

    public Location() {
    }

    @JsonIgnore
    @OneToMany(mappedBy = "location")
    private Set<Publisher> publishersInLocation = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "location")
    private Set<UserCloned> usersInLocation = new HashSet<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getPostal_code() {
        return postal_code;
    }

    public void setPostal_code(String postal_code) {
        this.postal_code = postal_code;
    }

    public String getDistrict() {
        return District;
    }

    public void setDistrict(String district) {
        District = district;
    }

    public Set<Publisher> getPublishersInLocation() {
        return publishersInLocation;
    }

    public Set<UserCloned> getUsersInLocation() {
        return usersInLocation;
    }

}
