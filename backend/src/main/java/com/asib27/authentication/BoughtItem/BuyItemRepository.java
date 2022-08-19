package com.asib27.authentication.BoughtItem;

import com.asib27.authentication.Book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyItemRepository extends JpaRepository<Buy_item, Long> {
    @Query(value = "SELECT * FROM books where isbn IN(SELECT isbn from books JOIN bought_items ON (b.isbn = book_id) WHERE user_id = ?1) ",nativeQuery = true)
    List<Book> getListOfSoldBooks(Long id);
}
