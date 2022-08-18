package com.asib27.authentication.CartItem;


import com.asib27.authentication.UserCloned.UserCloned;
import com.asib27.authentication.UserCloned.UserClonedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cartItem")
public class CartItemController {

    @Autowired
    CartItemService cartItemService;
    @Autowired
    UserClonedService userClonedService;



    @PostMapping("/add")
    public CartItem addNewCartItem(@RequestParam Long bookId, @RequestParam(defaultValue = "1") Integer quantity){
        if(bookId == null )return null;
        UserCloned user = userClonedService.getCurrentUser();
        return cartItemService.addNewCartItem(bookId, user, quantity);
    }

    @GetMapping("/get")
    public List<Object[]> getAllBooksInCart(){
        UserCloned user = userClonedService.getCurrentUser();
        return cartItemService.getAll(user);
    }

    @DeleteMapping("/remove")
    public void removeBook(@RequestParam Long bookId){
        if(bookId == null )return;
        UserCloned user = userClonedService.getCurrentUser();
        cartItemService.remove(bookId, user);
    }

    @DeleteMapping("/removeAll")
    public void removeBook(){
        UserCloned user = userClonedService.getCurrentUser();
        cartItemService.removeAll(user);
    }

    @PostMapping("/updateQuantity")
    public void updateQuantity(@RequestParam Long bookId, @RequestParam(defaultValue = "1") Integer quantity){
        if(bookId == null) return ;
        UserCloned user = userClonedService.getCurrentUser();
        cartItemService.updateQuantity(bookId,user, quantity);

    }

    @GetMapping("/totalPrice")
    public Double getTotalPrice(){
        UserCloned user = userClonedService.getCurrentUser();
        return cartItemService.getTotalPrice(user);
    }

    @GetMapping("/totalPriceWithDiscount")
    public Double getPriceWithDiscount(@RequestParam Long couponId)  {

        UserCloned user = userClonedService.getCurrentUser();
        try {
            return cartItemService.getDisountedTotal(user, couponId);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return getTotalPrice();
    }

    @PostMapping("/buy")
    public void buyCartItems(){
        UserCloned user = userClonedService.getCurrentUser();
        cartItemService.reduce_the_count_of_cartBooks(user);
    }



}
