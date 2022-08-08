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

    public Long getBookIdByName(String book_name){
        return bookRepository.getBookIdByName(book_name);
    }
    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }

    public Book getBook(Long bookId) {
        boolean exist = bookRepository.existsById(bookId);
        if(!exist){
            throw new IllegalStateException("No book with given id !!");
        }
        return bookRepository.findById(bookId).get();
    }

    public List<Book> getRandomBooks(int count) {
        return bookRepository.getRandomBooks(count);
    }
}

