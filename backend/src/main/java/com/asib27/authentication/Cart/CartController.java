package com.asib27.authentication.Cart;

import com.asib27.authentication.Book.Book;
import com.asib27.authentication.Book.BookService;
import com.asib27.authentication.UserCloned.UserCloned;
import com.asib27.authentication.UserCloned.UserClonedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    CartService cartService;
    @Autowired
    UserClonedService userClonedService;
    @Autowired
    BookService bookService;

    @GetMapping("/get/{cartId}")
    public Cart getACart(@PathVariable Long cartId){
        return cartService.getACart(cartId);

    }

    @GetMapping("/get")
    public List<Cart> getCarts(){
        return cartService.getCarts();
    }

    @PostMapping("/add")
    public  String addNewCart(@RequestBody Cart cart){
        cartService.addCart(cart);
        return "new cart added";
    }

    @PutMapping("/add/{bookId}/to/{cartid}")
    public Cart addBookToCart(@PathVariable Long bookId, @PathVariable Long cartid){
        Book book = bookService.getBook(bookId);
        Cart cart = cartService.getACart(cartid);
        cart.addBook(book);
        return cartService.addCart(cart);
    }

    @PostMapping("/add/{userid}/to/{cartid}")
    public Cart addCartToUser(@PathVariable Long cartid,@PathVariable Long userid){

        Cart cart = cartService.getACart(cartid);
        UserCloned user = userClonedService.getAnUer(userid);
        user.setCart(cart);
        cart.setUser(user);
        return cartService.addCart(cart);
    }



}
