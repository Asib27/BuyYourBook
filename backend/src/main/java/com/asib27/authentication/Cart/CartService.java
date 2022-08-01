package com.asib27.authentication.Cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    CartRepository cartRepository;

    public Cart getACart(Long cartId) {
        boolean exists = cartRepository.existsById(cartId);
        if(!exists){
            throw new IllegalStateException("cart not found");
        }
        else{
            return cartRepository.findById(cartId).get();
        }
    }
    public List<Cart> getCarts() {

        return cartRepository.findAll();
    }

    public Cart addCart(Cart cart) {
        return cartRepository.save(cart);
    }
}
