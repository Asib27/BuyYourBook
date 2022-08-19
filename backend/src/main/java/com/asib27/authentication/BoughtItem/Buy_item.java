package com.asib27.authentication.BoughtItem;

import javax.persistence.*;

@Table(name = "bought_items")
@Entity(name = "bought_items")
public class Buy_item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long user_id;
    private Long book_id;
    private Integer quantity;

    public Buy_item() {
    }

    public Buy_item(Long user_id, Long book_id, Integer quantity) {
        this.user_id = user_id;
        this.book_id = book_id;
        this.quantity = quantity;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getBook_id() {
        return book_id;
    }

    public void setBook_id(Long book_id) {
        this.book_id = book_id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
