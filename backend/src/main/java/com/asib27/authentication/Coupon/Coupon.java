package com.asib27.authentication.Coupon;

import javax.persistence.*;

@Table(name = "coupon")
@Entity(name = "coupon")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            unique = true
    )
    private String name;
    private String status;
    private Double discount;

    public Coupon(String name, String status, Double dis) {
        this.name = name;
        this.status = status;
        discount = dis;
    }

    public Coupon() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
