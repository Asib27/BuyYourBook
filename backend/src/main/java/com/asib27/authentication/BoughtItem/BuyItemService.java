package com.asib27.authentication.BoughtItem;


import com.asib27.authentication.Book.Book;
import com.asib27.authentication.UserCloned.UserCloned;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyItemService {

    @Autowired
    BuyItemRepository buyItemRepository;

    public List<Book> getListOfSoldBooks(UserCloned user) {
        return buyItemRepository.getListOfSoldBooks(user.getId());
    }
}
