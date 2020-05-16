import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding :"10px 0",
    "& > *": {
      margin: theme.spacing(1),
      width: "350px", //theme.spacing(16),
      height: "100%", //theme.spacing(16),
      display: "flex",
      flexDirection: "column",
      padding: "25px",
      alignItems: "center",
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  },
  action: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  chipsGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "100px",
  },
}));
export default function PujariCard({
  pujari: { id, name, state },
  onChoose
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  return (
    <div className={classes.root}>
      <Paper elevation={14}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <img
          variant="square"
          className={classes.large}
          alt="Remy Sharp"
          src="https://picsum.photos/100"
        />
        <Typography variant="h6" gutterBottom> Experience: 4 Yrs</Typography>
        <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
        
        <div className={classes.chipsGroup}>
          <Chip label="Telugu" variant="outlined" />
          <Chip label="English" variant="outlined" />
          <Chip label="Tamil" variant="outlined" />
          <Chip label="Malayalam" variant="outlined" />
        </div>

        <Typography
          className={classes.description}
          variant="body1"
          gutterBottom
        >
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>

        <div className={classes.action}>
          <Button size="large" color="primary" variant="outlined">
            See more
          </Button>
          <Button onClick={onChoose} size="large" color="primary" variant="outlined">
            Select
          </Button>
        </div>
      </Paper>
    </div>
  );
}

PujariCard.propTypes = {
  puja: PropTypes.object,
};

PujariCard.defaultValues = {
  puja: {
    id: "1",
    name: "hello",
  },
};