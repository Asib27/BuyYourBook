package com.asib27.authentication.Payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    PaymentRepository paymentRepository;

    public Payment addNewPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public void deletePayment(Long payment_id) {
        boolean exist = paymentRepository.existsById(payment_id);
        if(!exist){
            throw new IllegalStateException("payment info not found");
        }
        else{
            paymentRepository.deleteById(payment_id);
        }
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment findPaymentById(Long id) {
        boolean exist = paymentRepository.existsById(id);
        if(!exist){
            throw new IllegalStateException("payment info not found");
        }
        else{
            return paymentRepository.findById(id).get();
        }
    }
}
