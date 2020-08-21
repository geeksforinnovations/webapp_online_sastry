import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BookPujaForm from "./PujaForm/BookPujaForm";
import PaymentPage from "./Payment/PaymentPage";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PujaList from "./PujaList";
import { connect } from "react-redux";
import PujariList from "./PujariList";
import { setBooking, setPujari, setPuja } from "../../actions/bookings.actions";
// import { APIs } from "../../APIs/API";
import Booking from "../../models/Booking";
import SuccessPage from "./SuccessPage";
import PujaInfoModal from "../../components/ShowPujaInfoModal/PujaInfoModal";


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


function BookPuja(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  let [openSeeMore, setSeeMoreOpen] = React.useState(false)
  const [piujaToSee, setPujaToSee] = React.useState({})
  const [order, setOrder] = React.useState({})
  const onSelectPuja = (puja) => {
    props.setPuja(puja)
    handleNext()

  }
  const onSelectPujaries = (pujaries) => {
    props.setPujari(pujaries)
    handleNext()
  }
  const confirmBooking = async (token) => {
    try {
      const book = await Booking.confirm(props.booking, token)
      if (book.data != null) {
        setOrder(book.data)
        handleNext()
      }
      else {
        alert('failed')
      }

    } catch (error) {

    }

  }
  const onConfirmUserInfo = (details) => {
    let { booking } = props
    let info = { ...booking, ...details }
    //info.pujaId = props.selectedPuja.id
    debugger;
    props.setBooking(info)
  }
  const onPujaSeeMore = (puja) => {
    setPujaToSee(puja)
    setSeeMoreOpen(true)
  }



  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PujaList onSeeMore={onPujaSeeMore} onSelectPuja={onSelectPuja}> </PujaList>;
      case 1:
        return <PujariList goBack={handleBack} onSelectPujaries={onSelectPujaries} ></PujariList>;
      case 2:
        return <BookPujaForm goBack={handleBack} onConfirm={onConfirmUserInfo} onBookingSubmit={onBookingSubmit} ></BookPujaForm>;
      case 3:
        return <PaymentPage goBack={handleBack} confirmPay={confirmBooking}></PaymentPage>;
      case 4:
        return <SuccessPage goToHome={handleReset} order={order}></SuccessPage>;
      default:
        return "Unknown step";
    }
  }


  const onBookingSubmit = (booking) => {
    handleNext()
  }

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

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

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <AppBar color="" position="fixed">
        <Toolbar>
          <Button onClick={() => { window.history.back() }}>
            <HomeIcon></HomeIcon>
            <Typography variant="h6" className={classes.title}>Online Pujari</Typography>
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
                {/* <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton> */}
              </Step>
            );
          })}
        </Stepper>
      </div>


      <div>
        {activeStep === steps.length ? null : (
          <div>
            {getStepContent(activeStep, handleNext)}
          </div>
        )}
      </div>

      <PujaInfoModal puja={piujaToSee} toggleModal={() => { setSeeMoreOpen(!openSeeMore) }} open={openSeeMore}></PujaInfoModal>
    </div>
  );
}

PropTypes.BookPuja = {};

const mapStateToProps = state => ({
  pujas: state.pujas.availablePujas,
  booking: state.booking.booking,
  selectedPuja: state.booking.selectedPuja
})

const mapDispatchToProps = dispatch => ({
  setBooking: booking => dispatch(setBooking(booking)),
  setPuja: puja => dispatch(setPuja(puja)),
  setPujari: pujari => dispatch(setPujari(pujari))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookPuja)
//defaultProps.BookPuja = {};
