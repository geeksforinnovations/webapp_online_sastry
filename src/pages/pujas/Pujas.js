import React, { useState, useRef } from "react";
import { Grid, TextField, Paper, Chip, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import config from "../../config";
import { Storage } from "aws-amplify";
// import { Link } from "react-router-dom";
// import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
// import se
// import { s3Upload } from "../../libs/awsLib";
// logo
// import logo from "./logo.svg";

export default function Pujas() {
  const file = useRef(null);
  var [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const langueages = [
    { text: "Telugu", value: "te" },
    { text: "Hindi", value: "hi" },
    { text: "Marati", value: "mt" },
    { text: "Tamil", value: "ta" }
  ];
  var classes = useStyles();
  async function s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`;
  
    const stored = await Storage.vault.put(filename, file, {
      contentType: file.type
    });
  
    return stored.key;
  }
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  async function handleSubmit(event) {
    //event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
    try {
      const s3Result=  await s3Upload(file.current)
      console.log('s3 result is', s3Result)
       setIsLoading(true);
    } catch (error) {
      console.error('er'.error)
      alert('err')
    }
  
  }
  return (
    <>
      <PageTitle title="Pujas" />
      <Paper className={classes.paper}>
        <Grid lg container spacing={4}>
          <Grid item md={4}>
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
              placeholder="Name"
              type="text"
              label="Puja Name"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item md={4}>
            <TextField
              id="puja"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              value={name}
              onChange={e => setName(e.target.value)}
              margin="normal"
              placeholder="Price"
              label="Puja Price"
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Time"
              type="text"
              label="time taking for puja"
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              id="puja"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              //value={name}
              multiline
              //onChange={e => setName(e.target.value)}
              margin="normal"
              placeholder="About Puja"
              type="text"
              label="About"
              rowsMax={10}
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              id="puja"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              //value={name}
              multiline
              //onChange={e => setName(e.target.value)}
              margin="normal"
              placeholder="Key Insights"
              type="text"
              label="Key Insights"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple              
              options={langueages}
              getOptionLabel={option => option.text}
              //defaultValue={[top100Films[6], top100Films[13]]}
              renderTags={(value, { className, onDelete }) =>
                value.map((option, index) => (
                  <Chip
                    key={index}
                    disabled={index === 0}
                    data-tag-index={index}
                    tabIndex={-1}
                    label={option.text}
                    className={className}
                    onDelete={onDelete}
                  />
                ))
              }
              style={{ width: "100%" }}
              renderInput={params => (
                <TextField
                  {...params}
                  //label="Fixed tag"
                  variant="outlined"
                  placeholder="Languages Available for this Puja"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <input
              accept="image/*"
              className={classes.fileInput}
              id="contained-button-file"
              onChange={handleFileChange}
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                className={classes.button}
              >
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              component="span"
              className={classes.button}
              onClick={handleSubmit}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
