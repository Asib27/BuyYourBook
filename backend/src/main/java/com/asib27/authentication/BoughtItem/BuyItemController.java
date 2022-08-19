package com.asib27.authentication.BoughtItem;

import com.asib27.authentication.Book.Book;
import com.asib27.authentication.UserCloned.UserCloned;
import com.asib27.authentication.UserCloned.UserClonedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bought_items")
public class BuyItemController {
    @Autowired
    UserClonedService userClonedService;
    @Autowired
    BuyItemService buyItemService;


    @GetMapping("/get")
    public List<Book> getListOfSoldBooks(){
        UserCloned user = userClonedService.getCurrentUser();
        return buyItemService.getListOfSoldBooks(user);
    }

}
