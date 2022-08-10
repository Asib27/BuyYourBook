package com.asib27.authentication.Book;

import com.asib27.authentication.Publisher.Publisher;
import com.asib27.authentication.Publisher.PublisherService;
import com.asib27.authentication.Writer.Writer;
import com.asib27.authentication.Writer.WriterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    BookService bookService;
    @Autowired
    WriterService writerService;
    @Autowired
    PublisherService publisherService;

    @GetMapping("/get")
    public List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }

    @GetMapping("/get/{book_name}")
    public Long getBookIdByName(@PathVariable String book_name){
        // System.out.println("called" + book_name);
        Long x = bookService.getBookIdByName(book_name);
        // System.out.println(x);
        return x;
    }

    @PostMapping("/add")
    public String addNewBook(@RequestBody Book book){
        bookService.addNewBook(book);
        return "New book added";
    }

    @DeleteMapping(path = "/delete/{bookId}")
    public String deleteBook(@PathVariable("bookId") Long bookId){
        bookService.deleteBook(bookId);
        return "Book with id "+ bookId + " is deleted.";
    }

    @PutMapping("/add/{bookName}/writer/{writerName}")
    public Book authorsOfBook(@PathVariable String bookName, @PathVariable String writerName){
        Long bookId = bookService.getBookIdByName(bookName);
        Book book = bookService.getBook(bookId);
        Long writerId = writerService.getWriterIdByName(writerName);
        Writer writer = writerService.getAWriter(writerId);
        book.addWriters(writer);
        return bookService.addNewBook(book);
    }

    @GetMapping("/get/random/{count}")
    public List<Book> getRandomBooks(@PathVariable int count){
        return bookService.getRandomBooks(count);
    }

    @PutMapping("/add/{bookId}/published_by/{publisherId}")
    public Book publisherOfBook(@PathVariable Long bookId, @PathVariable Long publisherId){
        Book book = bookService.getBook(bookId);
        Publisher publisher = publisherService.getPublisher(publisherId);
        book.addPublisher(publisher);
        return bookService.addNewBook(book);
    }
}

