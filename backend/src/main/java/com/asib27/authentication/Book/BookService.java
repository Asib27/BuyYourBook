package com.asib27.authentication.Book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;


    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public Book addNewBook(Book book) {
        return bookRepository.save(book);

    }
    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }

    public Book getBook(Long bookId) {
        return bookRepository.findById(bookId).get();
    }
}
