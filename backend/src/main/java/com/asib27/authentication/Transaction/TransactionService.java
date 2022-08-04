package com.asib27.authentication.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;


    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction findTransactionByID(Long tx_id){
        boolean exists = transactionRepository.existsById(tx_id);
        if(!exists){
            throw new IllegalStateException("No Transaction with given id ");
        }
        else{
            return transactionRepository.findById(tx_id).get();
        }
    }

    public boolean deleteTransaction(Long tx_id){
        boolean exists = transactionRepository.existsById(tx_id);
        if(!exists){
            throw new IllegalStateException("No Transaction with given id ");
        }
        else{
            transactionRepository.deleteById(tx_id);
            return true;
        }
    }

}
