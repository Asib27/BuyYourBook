package com.asib27.authentication.Payment;

import com.asib27.authentication.UserCloned.UserClonedService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClient {

    @Autowired
    StripeClient(){
        Stripe.apiKey = "${stripe.key.secret}";
    }
    @Autowired
    UserClonedService userClonedService;

    public Customer createCustomer(String token) throws Exception {
        String email = userClonedService.getCurrentUser().getEmail();
        String userName = userClonedService.getCurrentUser().getUsername();
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("name", userName);
        customerParams.put("email", email);
        customerParams.put("source", token);
        return Customer.create(customerParams);
    }

    public Charge chargeCreditCard(String token, Double amount) throws StripeException {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
        return charge;
    }

    public Charge chargeCustomerCard(String customerId, int amount) throws Exception {
        String sourceCard = Customer.retrieve(customerId).getDefaultSource();
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "USD");
        chargeParams.put("customer", customerId);
        chargeParams.put("source", sourceCard);
        Charge charge = Charge.create(chargeParams);
        return charge;
    }
}