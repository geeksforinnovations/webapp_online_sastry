import React, { useState, useRef } from "react";
import { Grid, TextField, Paper, Chip, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import config from "../../config";
import { Storage, API } from "aws-amplify";
import { PhotoPicker } from 'aws-amplify-react';
import { useTheme } from "@material-ui/styles";
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
  let [price, setPrice] = useState('')
  let [time, setTime] = useState('')
  let [about, setAbout] = useState('')
  let [insights, setInsights] = useState('')
  let [pujaImage, uploadPujaImage] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  var theme = useTheme();
  const langueages = [
    { text: "Telugu", value: "te" },
    { text: "Hindi", value: "hi" },
    { text: "Marati", value: "mt" },
    { text: "Tamil", value: "ta" }
  ];
  var classes = useStyles();
  async function s3Upload(file) {
    debugger
    const filename = `${Date.now()}-${file.name}`;

    const stored = await Storage.put(filename, file, {
      contentType: file.type
    });

    const getfile = await Storage.get(filename);
    uploadPujaImage(getfile)
    console.log('get', getfile)

    return stored.key;
  }
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  async function createPuja() {
    // const puja ={
    //   name,
    //   time,
    //   price,
    //   about,
    //   insights
    // }
    const puja = {
      name,
      description: insights,
      about,
      timeInHrs: time,
      requiredThings: '{}',
      pujaType: 'Online',
      type: 'Online',
      cost: price
    }
    const requestData = {
      body: puja
    }

    try {
      const x = await API.post('pujas', '/pujas', requestData)
    } catch (error) {
      console.log('err', error)
      throw error

    }


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
      const s3Result = await s3Upload(file.current)
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
              value={price}
              onChange={e => setPrice(e.target.value)}
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
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="Time"
              type="text"
              label="Time taking for puja"
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
              value={about}
              multiline
              onChange={e => setAbout(e.target.value)}
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
              value={insights}
              multiline
              onChange={e => setInsights(e.target.value)}
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

          <Grid item md={12}>
            <PhotoPicker
              theme={theme}
              preview="hidden"
              title="Puja Photo"
              headerHint="Choose a photo to display for Puja"
              headerText="Puja Photos"
              onPick={data => s3Upload(data.file)} />
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              component="span"
              className={classes.button}
              onClick={createPuja}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
