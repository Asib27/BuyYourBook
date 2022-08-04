package com.asib27.authentication.Payment;

import com.asib27.authentication.Transaction.Transaction;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Table(name = "payment")
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "payment_id"
    )
    private Long id;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "type")
    private String type;

    @Column(name = "price")
    private int price;

    @JsonIgnore
    @OneToOne(mappedBy = "payment")
    private Transaction transaction;

    public Payment(String mobile, String type, int price) {
        this.mobile = mobile;
        this.type = type;
        this.price = price;
    }

    public Payment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}