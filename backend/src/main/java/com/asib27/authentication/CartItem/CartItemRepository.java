package com.asib27.authentication.CartItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query(value = "select * from books where isbn IN (select book_id from cart_item where user_id = ?1);", nativeQuery = true)
    List<Object[]> getAll(Long id);

    @Modifying
    @Query(value = "DELETE FROM cart_item WHERE (book_id=?1 and user_id=?2);", nativeQuery = true)
    void removeBook(Long bookId, Long id);

    @Modifying
    @Query(value = "DELETE FROM cart_item WHERE user_id=?1;", nativeQuery = true)
    void removeAll(Long id);

    @Modifying
    @Query(value = "UPDATE cart_item SET quantity=?3 WHERE (book_id=?1 AND user_id=?2);", nativeQuery = true)
    void updateQuantity(Long bookId, Long id, Integer quantity);

    @Query(value = "select sum(b.price*c.quantity) from books b join cart_item c on b.isbn = c.book_id where c.user_id=?1", nativeQuery = true)
    Double getTotalPrice(Long id);

    @Query(value = "select sum(b.price*(1-(?2/100))*c.quantity) from books b join cart_item c on b.isbn = c.book_id where c.user_id=?1", nativeQuery = true)
    Double getDisountedTotal(Long id, Double discount);

    @Modifying
    @Query(value = " update books set quantity_available=table1.quantity from " +
                   "(select isbn as id, (quantity_available - quantity) as quantity from books join cart_item on(isbn = book_id) " +
                   "where user_id = ?1) as table1 where isbn = table1.id;", nativeQuery = true)
    void reduce_the_count_of_cartBooks(Long user_id);

}
