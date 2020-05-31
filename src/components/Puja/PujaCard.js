import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "10px 0",
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
    height:'40px',
    overflow:'hidden',
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
export default function PujaCard(props) {
  const { puja, onBook } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={14}>
        <Typography variant="h6" gutterBottom>
          {puja.name}
        </Typography>
        <img
          variant="square"
          className={classes.large}
          alt="Remy Sharp"
          src="https://picsum.photos/100"
        />
        <Typography variant="h6" gutterBottom> Time: {puja.timeInHrs}Hrs Price: ${puja.cost}</Typography>

        <div className={classes.chipsGroup}>
          {puja.Languages.map((lang, i) => {
            return <Chip key={`${i}_sdf`} label={lang} variant="outlined" />
          })}
        </div>

        <Typography
          className={classes.description}
          variant="body1"
          gutterBottom
        >
          {puja.description}
        </Typography>

        <div className={classes.action}>
          <Button size="large" color="primary" variant="outlined">
            See more
          </Button>
          <Button onClick={() => onBook(puja)} size="large" color="primary" variant="outlined">
            Book
          </Button>
        </div>
      </Paper>
    </div>
  );
}

PujaCard.propTypes = {
  puja: PropTypes.object,
};

PujaCard.defaultValues = {
  puja: {
    id: "1",
    name: "hello",
  },
};
