import React from 'react';
import { Typography, Button } from '@material-ui/core';

const SuccessPage = (props) => {
    const { order, goToHome } = props;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Typography align="center" variant="h3">Your payment is success</Typography>

            <Typography align="center" variant="h3">Your Order ID is : {order.id}</Typography>

            <Button onClick={goToHome} style={{ width: '120px', marginTop: '150px' }} variant="contained" color="primary">Go To Home </Button>

        </div>
    );
}

export default SuccessPage;