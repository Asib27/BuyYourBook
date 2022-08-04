package com.asib27.authentication.Payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @PostMapping("/add")
    public String addNewPayment(@RequestBody Payment payment){
        paymentService.addNewPayment(payment);
        return "new payment Added !!";
    }
    @DeleteMapping("/delete/{payment_id}")
    public String deletePayment(@PathVariable Long payment_id){
        paymentService.deletePayment(payment_id);
        return "payment deleted!!";
    }
    @GetMapping("/get")
    public List<Payment> getAllPayments(){
        return paymentService.getAllPayments();
    }

    @GetMapping("/get/{id}")
    public Payment getPaymentById(@PathVariable Long id){
        return paymentService.findPaymentById(id);
    }
}
