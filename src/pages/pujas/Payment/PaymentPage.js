import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import { loadStripe } from '@stripe/stripe-js';
import { Grid, TextField, Paper, FormControl, InputLabel, Select, MenuItem, Input, makeStyles, Button, FormLabel } from "@material-ui/core";
import { APIs } from "../../../APIs/API";
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
      border:'1px solid red',
      // borderWidth: "1px",
      // borderColor: 'black',
      //iconColor: '#c4f0ff',
      //color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '18px',
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
const CheckoutForm = ({  confirmPay }) => {
  let [name, setName] = useState("");
  let [zip, setZip] = useState("")
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    try {
      const token = await stripe.createToken(card);
      confirmPay(token.token.id)
     
    } catch (error) {
      console.error(error)
      alert('payment failed')
    }
   
  };



  return (
    <form style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <TextField
        //className={classes.field}
        fullWidth
        margin="normal"
        //value={time}
        //onChange={e => setTime(e.target.value)}
        placeholder="Name on the card"
        type="text"
        label="Name On the card"
        variant="outlined"
      />

<FormLabel>Enter Card Details</FormLabel>

      <div style={{ border: '1px solid #6E6E6E' }}>
       
        <CardElement  options={CARD_OPTIONS} />
      </div>

      <Button onClick={handleSubmit} style={{ marginTop: "30px" }} size="large" color="primary" variant="outlined" type="submit">Pay</Button>
    </form>
  );
};

// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const PaymentPage = ({ confirmPay }) => (
  <div style={{ width: "400px", margin: '30px auto' }}>

    <CheckoutForm confirmPay={confirmPay} />

  </div>

);

export default PaymentPage