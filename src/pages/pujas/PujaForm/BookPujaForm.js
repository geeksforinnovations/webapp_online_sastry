import React, { useState, useRef } from "react";
import { Grid, TextField, Paper, FormControl, InputLabel, Select, MenuItem, Input, makeStyles, Button } from "@material-ui/core";

import { useTheme } from "@material-ui/styles";

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';
import phone from 'phone'
import Booking from "../../../models/Booking";

// styles
// import useStyles from "../styles";

// components
import PhoneField from "../../../components/PhoneInput/PhoneField";
// import { API } from "aws-amplify";
import { APIs } from "../../../APIs/API";
import { BOOKING } from "../../../actions/actions.constants";
import { setBooking } from "../../../actions/bookings.actions";


export default function BookPujaForm({ handleNext, onBookingSubmit, onConfirm }) {

    let [fname, setfName] = useState("");
    let [phNumber, setphNumber] = useState('')
    let [isDisplayOTP, setIsDisplay] = useState(false)
    let [email, setEmail] = useState('')
    let [otp, setOTP] = useState('')
    let [startDate, setStartDate] = useState(new Date());
    let [endDate, setEndtDate] = useState(new Date());
    let [emailerr, setEmailErr] = useState(false)
    let [countryCode , setCountryCode] = useState('USD')

    const sendOTP = async (e) => {
        e.preventDefault()
        if(emailerr){
            return false;
        }

        const ph = phone(phNumber,countryCode)
        const booking = {
            languageId: 1,
            pujaStartDate: startDate,
            pujaEndDate: endDate,
            customerName: fname,
            email: email,
            phone: phNumber,
        }
        onConfirm(booking)
        const resp = await APIs.sendOTP(ph[0])
        setIsDisplay(true)
    }
    const verifyOTP = async () => {
        const ph = phone(phNumber, countryCode)
        try {
            const resp = await APIs.verifyOTP(ph[0], otp)
            if (resp.data.valid == true) {
                onBookingSubmit()
            } else {
                alert("enter valid OTP")
            }
            //handleNext()
        } catch (error) {

        }

    }
    const IsValidEmail =(str)=> {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
    }

    const handleStartDate = (date) => {
        setStartDate(date);
    };
    const handleEndDate = (date) => {
        setEndtDate(date);
    };
    const handlePhNumber = (e) => {
        setphNumber(e.target.value)
    }
    const updateEmail =(email) => {
        const isValidEmail  = IsValidEmail(email)
        setEmailErr(!isValidEmail)
        setEmail(email)
    }
    var theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "600px",
            margin: "auto",
            paddingTop: "35px",
            margin: "45px auto"
        },
        field: {
            width: "500px",
            margin: '20px 0'
        }
    }));
    var classes = useStyles();
    return (
        <Paper className={classes.root}>
            <form onSubmit={sendOTP}>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Grid item xs={12} >
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <DateTimePicker
                                disablePast={true}
                                className={classes.field}
                                disableToolbar
                                margin="normal"
                                //id="date-picker-inline"
                                label="Puja Start Date"
                                value={startDate}
                                inputVariant="standard"
                                onChange={handleStartDate}
                                fullWidth

                            />
                        </MuiPickersUtilsProvider>

                    </Grid>

                    <Grid item xs={12} >
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <DateTimePicker
                                minDate={startDate}
                                disablePast={true}
                                className={classes.field}
                                disableToolbar
                                margin="normal"
                                //id="date-picker-inline"
                                label="Puja End Date"
                                value={endDate}
                                inputVariant="standard"
                                onChange={handleEndDate}
                                fullWidth

                            />
                        </MuiPickersUtilsProvider>

                    </Grid>



                    <Grid xs={12} item >
                        <FormControl
                            className={classes.field}
                            fullWidth
                            variant="standard" >
                            <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={10}
                                onChange={() => { }}
                                label="Select Language"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Telugu</MenuItem>
                                <MenuItem value={20}>Hindi</MenuItem>
                                <MenuItem value={30}>Tamil</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid xs={12} item >
                        <TextField
                            required={true}
                            className={classes.field}
                            fullWidth
                            margin="normal"
                            value={fname}
                            onChange={e => setfName(e.target.value)}
                            placeholder="Full Name"
                            type="text"
                            label="Full Name"
                            variant="standard"
                        />
                    </Grid>
                    <Grid xs={12} item >
                        <TextField
                        error={emailerr}
                            required={true}
                            className={classes.field}
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={e => updateEmail(e.target.value)}
                            placeholder="Email"
                            type="text"
                            label="Email"
                            variant="standard"
                        />
                    </Grid>
                    <Grid xs={12} item >
                        {/* <FormControl
                            className={classes.field}
                            fullWidth

                            variant="standard"
                        >
                            <InputLabel>Contact Number</InputLabel>
                            <Input
                                required={true}
                                value={phNumber}
                                onChange={(ph) => { handlePhNumber(ph) }}
                                name="textmask"
                                inputComponent={PhoneField}
                                variant="outlined"
                                prefix="+1"
                            />
                        </FormControl> */}
                        <TextField
                            className={classes.field}
                            fullWidth
                            margin="normal"
                            placeholder="Contact Number"
                            type="text"
                            label="Contact Number"
                            variant="standard"
                            required={true}
                            value={phNumber}
                            min={10}
                            max={10}
                            onChange={handlePhNumber}
                        />

                    </Grid>

                    {isDisplayOTP ?
                        <Grid xs={12} item >
                            <TextField
                                required={true}
                                className={classes.field}
                                fullWidth
                                margin="normal"
                                value={otp}
                                onChange={e => setOTP(e.target.value)}
                                placeholder="OTP"
                                type="text"
                                label="Enter OTP"
                                variant="standard"
                            />

                        </Grid> : null}

                    {isDisplayOTP
                        ? <><Button style={{ marginBottom: '20px' }} color="primary" variant="contained" size="medium" onClick={verifyOTP}>Verify OTP</Button>
                            <Button style={{ marginBottom: '20px' }} color="primary" variant="contained" size="medium" onClick={handleNext}>Resend SMS</Button> </>
                        : <Button type="submit" style={{ marginBottom: '20px' }} color="primary" variant="contained" size="medium" >Confirm</Button>}
                </Grid>
            </form>
        </Paper>
    );
}
