import React, { useState, useRef } from "react";
import { Grid, TextField, Paper, FormControl, InputLabel, Select, MenuItem, Input, makeStyles } from "@material-ui/core";

import { useTheme } from "@material-ui/styles";

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';

// styles
// import useStyles from "../styles";

// components
import PhoneField from "../../../components/PhoneInput/PhoneField";


export default function BookPujaForm({ handleNext }) {
    const file = useRef(null);
    var [name, setName] = useState("");
    let [price, setPrice] = useState('')
    let [time, setTime] = useState('')
    let [about, setAbout] = useState('')
    let [insights, setInsights] = useState('')
    let [pujaImage, uploadPujaImage] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    var theme = useTheme();
    const langueages = [
        { text: "Telugu", value: "te" },
        { text: "Hindi", value: "hi" },
        { text: "Marati", value: "mt" },
        { text: "Tamil", value: "ta" }
    ];
    const useStyles = makeStyles((theme) => ({
        root: {
            width: "600px",
            /* align-items: center; */
            /* justify-content: center; */
            margin: "auto",
            paddingTop: "35px",
            margin: "45px auto"
        },
        field: {
            // padding: theme.spacing(3),
            width: "500px",
            margin: '20px 0'
        }
    }));
    var classes = useStyles();



    return (
        <>
            <Paper className={classes.root}>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Grid item xs={12} >
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <DateTimePicker
                                className={classes.field}
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField
                                    }
                                }}
                                disableToolbar
                                //variant="inline"
                                //format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                inputVariant="outlined"
                                onChange={handleDateChange}
                                fullWidth
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                    </Grid>

                    <Grid xs={12} item >
                        <FormControl
                            className={classes.field}
                            fullWidth
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField
                                }
                            }} variant="outlined" >
                            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
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
                            className={classes.field}
                            fullWidth
                            margin="normal"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                            placeholder="Time"
                            type="text"
                            label="Full Name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid xs={12} item >
                        <FormControl
                            className={classes.field}
                            fullWidth
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderline,
                                    input: classes.textField
                                }
                            }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="formatted-text-mask-input">Contact Number</InputLabel>
                            <Input

                                //value={values.textmask}
                                //onChange={handleChange}
                                name="textmask"
                                id="formatted-text-mask-input"
                                inputComponent={PhoneField}
                                variant="outlined"
                            />
                        </FormControl>

                    </Grid>

                </Grid>
            </Paper>
        </>
    );
}
