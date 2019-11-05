import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
// logo
// import logo from "./logo.svg";

export default function Pujas() {
  var [name, setName] = useState("");
  var classes = useStyles();
  return (
    <>
      <PageTitle title="Pujas" />
      <Grid container spacing={4}>
        <div style={{border:'1px solid red', margin:'0 10px', width:'250px'}}>
          <TextField
            id="puja"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField
              }
            }}
            value={name}
            onChange={e => setName(e.target.value)}
            margin="normal"
            placeholder="Puja Name"
            type="text"
            variant="outlined"
          />
        </div>

        <TextField
          id="puja"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField
            }
          }}
          value={name}
          onChange={e => setName(e.target.value)}
          margin="normal"
          placeholder="Puja Name"
          type="text"
          variant="outlined"
        />
        <TextField
          id="puja"
          InputProps={{
            classes: {
              underline: classes.textFieldUnderline,
              input: classes.textField
            }
          }}
          value={name}
          onChange={e => setName(e.target.value)}
          margin="normal"
          placeholder="Puja Name"
          type="text"
          variant="outlined"
        />
      </Grid>
    </>
  );
}
