import React from 'react';
import { makeStyles } from '@material-ui/core';


const  useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
      padding :"10px 0",
      "& > *": {
        margin: theme.spacing(1),
        width: "350px", //theme.spacing(16),
        height: "100%", //theme.spacing(16),
        display: "flex",
        flexDirection: "column",
        padding: "25px",
        alignItems: "center",
      }
    }
  }));
  
const PaymentPage = () => {
    var classes = useStyles();
    return (
        <div className={classes.root}>
           <h1>this is payment page</h1> 
        </div>
    );
}

export default PaymentPage;