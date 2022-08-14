import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkoutForm";
// import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LVfwtSCK00cFVdUgCeGovR4HGLHmQ9HtDVTgTQUZhYwJEmsZFNOubShcJsl3JZO6frCTUph4W1LsVqKsmk7YT2r00dnsdtm9S");

const intent={
    "id": "pi_1DrRp12eZvKYlo2C4N0w85M1",
    "object": "payment_intent",
    "amount": 1099,
    "amount_capturable": 0,
    "amount_details": {
      "tip": {}
    },
    "amount_received": 0,
    "application": null,
    "application_fee_amount": null,
    "automatic_payment_methods": null,
    "canceled_at": null,
    "cancellation_reason": null,
    "capture_method": "automatic",
    "charges": {
      "object": "list",
      "data": [],
      "has_more": false,
      "url": "/v1/charges?payment_intent=pi_1DrRp12eZvKYlo2C4N0w85M1"
    },
    "client_secret": "pi_1DrRp12eZvKYlo2C4N0w85M1_secret_7ZKXcVl7ghh5f3mjbEfb9EfSj",
    "confirmation_method": "automatic",
    "created": 1547220083,
    "currency": "eur",
    "customer": null,
    "description": null,
    "invoice": null,
    "last_payment_error": null,
    "livemode": false,
    "metadata": {},
    "next_action": null,
    "on_behalf_of": null,
    "payment_method": null,
    "payment_method_options": {},
    "payment_method_types": [
      "card"
    ],
    "processing": null,
    "receipt_email": null,
    "redaction": null,
    "review": null,
    "setup_future_usage": null,
    "shipping": null,
    "statement_descriptor": null,
    "statement_descriptor_suffix": null,
    "status": "requires_payment_method",
    "transfer_data": null,
    "transfer_group": null
  }


export default function Hello() {
  const [clientSecret, setClientSecret] = useState("pi_123_secret_123");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="hello">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}