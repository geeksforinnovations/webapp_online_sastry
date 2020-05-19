import React from 'react';
// import ReactDOM from 'react-dom';
// import { loadStripe } from '@stripe/stripe-js';
import { Grid, TextField, Paper, FormControl, InputLabel, Select, MenuItem, Input, makeStyles, Button } from "@material-ui/core";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      borderWidth: "1px",
      borderColor: 'black',
      //iconColor: '#c4f0ff',
      //color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      // ':-webkit-autofill': { color: '#fce883' },
      // '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      // color: '#ffc7ee',
    },
  },
};
const CheckoutForm = ({handleNext}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleNext()
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    // });
  };

  return (
    <form style={{
      display: "flex",
      flexDirection: "column"
    }} onSubmit={handleSubmit}>
      <CardElement options={CARD_OPTIONS} />

      <Button style={{marginTop:"30px"}} size="large" color="primary" variant="outlined" type="submit">Pay</Button>
    </form>
  );
};

// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const PaymentPage = ({handleNext}) => (
  <div style={{ width: "400px", margin: '30px auto' }}>
   
      <CheckoutForm handleNext={handleNext} />
   
  </div>

);

export default PaymentPage