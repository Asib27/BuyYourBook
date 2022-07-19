package com.asib27.authentication.Book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping
    public List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }

    @PostMapping
    public void addNewBook(@RequestBody Book book){
        bookService.addNewBook(book);
    }

    @DeleteMapping(path = "{bookId}")
    public void deleteBook(@PathVariable("bookId") Long bookId){
        bookService.deleteBook(bookId);
    }
}
