import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PujaCard from "../../components/Puja/PujaCard";
import PujariCard from "../../components/Pujari/PujariCard";
import BookPujaForm from "./PujaForm/BookPujaForm";
import PaymentPage from "./Payment/PaymentPage";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PujaList from "./PujaList";
import { connect } from "react-redux";
import PujariList from "./PujariList";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"

  },
  header: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center'
  },
  stepperHeader: {
    maxWidth: '1024px',
    margin: "0 auto"
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Select Puja",
    "Select Pujari",
    "Enter contact details",
    "Payment",
    "Success",
  ];
}

function getPujas(pujas, handleNext) {
  return (
    <div style={{ display: 'flex', flexWrap: "wrap", margin: "10px 0", justifyContent: 'center' }}>
      {pujas.map((num) => {
        return (
          <PujaCard
            puja={{
              id: "1",
              name: "hello",
            }}
            onBook={handleNext}
          ></PujaCard>
        );
      })}
    </div>
  );
}

function getPujaries(pujas, handleNext) {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
       <h3>You can select upto 3 pujaries.</h3>
       <div style={{ display: 'flex', flexWrap: "wrap", margin: "10px 0", justifyContent: 'center' }}>
     
     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10].map((num) => {
       return (
         <PujariCard
           pujari={{
             id: "1",
             name: "hello",
           }}
           onChoose={handleNext}
         ></PujariCard>
       );
     })}
   </div>

    </div>

  );
}

function getStepContent(step, handleNext, data) {
  switch (step) {
    case 0:
      return <PujaList handleNext={handleNext}> </PujaList>;
    case 1:
      return <PujariList  handleNext={handleNext}></PujariList>;
    case 2:
      return <BookPujaForm handleNext={handleNext}></BookPujaForm>;
    case 3:
      return <PaymentPage handleNext={handleNext}></PaymentPage>;
    case 4:
      return "Success";
    default:
      return "Unknown step";
  }
}
function BookPuja() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <AppBar color="" position="fixed">
        <Toolbar>
          <Button onClick={() => {window.history.back()}}>
          <HomeIcon></HomeIcon>
          <Typography variant="h6" className={classes.title}>
            Online Pujari
    </Typography>
          </Button>
          
        </Toolbar>
      </AppBar>
      <div className={classes.header}>
        <Typography variant="h1">Book Your Puja</Typography>
      </div>
      <div className={classes.stepperHeader}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            //   if (isStepOptional(index)) {
            //     labelProps.optional = (
            //       <Typography variant="caption">Optional</Typography>
            //     );
            //   }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>


      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
            <div>
              {getStepContent(activeStep, handleNext)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
              </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

PropTypes.BookPuja = {};

const mapStateToProps = state => ({
  pujas: state.pujas.availablePujas
})




export default connect(
  mapStateToProps,
  null
)(BookPuja)
//defaultProps.BookPuja = {};
