import React from "react";
import { Grid, Paper, TextField, makeStyles, Select, MenuItem, InputLabel, FormControl, Input, FormHelperText } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Typography } from "../../../components/Wrappers";
import { PhotoPicker } from "aws-amplify-react";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
  fullLength: {
    width: '100%'

  },
  text: {

  },
}));

export default function PujariProfile(props) {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Pujari Profile" button="Save" />
      <Grid>
        <PhotoPicker
              //theme={theme}
              preview="hidden"
              title="Pujari Photo"
              headerHint="Choose a photo to display in portal"
              headerText="Pujari Photos"
              onPick={data => {}} />
      </Grid>
      <Grid container spacing={4}>
        <Typography variant="h3" className={classes.text}>Personal Infomation</Typography>
        <Grid className={classes.root} spacing={4} item xs={12}>
          <TextField id="outlined-basic" label="First Name" variant="outlined" />
          <TextField id="outlined-basic" label="Last Name" variant="outlined" />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Contact No" variant="outlined" />
          <TextField id="outlined-basic" label="Experience" variant="outlined" />


          {/* <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Experience</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={10}
              onChange={() => { }}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}
          {/* <Paper >pujari profile here</Paper> */}

          <TextField
            className={classes.fullLength}
            variant="outlined"
            id="standard-full-width"
            label="Desbribe about you"
            style={{ margin: 8 }}
            placeholder="Write Something about you"
            helperText="About your experince"
            fullWidth
            margin="normal"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          />

        </Grid>


        <Typography variant="h3" className={classes.text}>Address Details</Typography>
        <Grid className={classes.root} spacing={4} item xs={12}>
          <TextField id="outlined-basic" label="House No" variant="outlined" />
          <TextField id="outlined-basic" label="Lane/Ward" variant="outlined" />
          <TextField id="outlined-basic" label="Locality" variant="outlined" />
          <TextField id="outlined-basic" label="Town/City" variant="outlined" />
          <TextField id="outlined-basic" label="State" variant="outlined" />
          <TextField id="outlined-basic" label="Pin" variant="outlined" />
        </Grid>

        <Typography variant="h3" className={classes.text}>Account Details</Typography>
        <Grid className={classes.root} spacing={4} item xs={12}>
          <TextField id="outlined-basic" label="Account No" variant="outlined" />
          <TextField id="outlined-basic" label="Acc Holder Name" variant="outlined" />
          <TextField id="outlined-basic" label="IFSC" variant="outlined" />
        </Grid>
      </Grid>
    </>
  );
}
