import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
// import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, createUser, confirmUser, useUserState } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();
  var { hasChallege } = useUserState()

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(1);
  // var [nameValue, setNameValue] = useState("");
  const [phone, setPhone] = useState("8886011443")
  var [loginValue, setLoginValue] = useState("manikumarkv@gmail.com");
  var [passwordValue, setPasswordValue] = useState("manikumar");
  const [code, setCode] = useState('')

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        {/* <img src={logo} alt="logo" className={classes.logotypeImage} /> */}
        <Typography className={classes.logotypeText}>Online Pujari Services</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Good Morning, User
              </Typography>
              <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                    <Button
                      disabled={
                        loginValue.length === 0 || passwordValue.length === 0
                      }
                      onClick={() =>
                        loginUser(
                          userDispatch,
                          loginValue,
                          passwordValue,
                          props.history,
                          setIsLoading,
                          setError,
                        )
                      }
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Login
                    </Button>
                  )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                {error}
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+1</InputAdornment>,
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                margin="normal"
                placeholder="Phone Number"
                type="text"
                fullWidth
              >
                
              </TextField>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />

              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                    <Button
                      onClick={() =>
                        createUser(
                          userDispatch,
                          phone,
                          loginValue,
                          passwordValue,
                          props.history,
                          setIsLoading,
                          setError,
                        )
                      }
                      disabled={
                        loginValue.length === 0 ||
                        passwordValue.length === 0 ||
                        phone.length === 0
                      }
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.createAccountButton}
                    >
                      Create your account
                    </Button>
                  )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                {/* <Typography className={classes.formDividerWord}>or</Typography> */}
                <div className={classes.formDivider} />
              </div>
              {hasChallege == true ?

                <div >
                  <TextField
                    id="code"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    margin="normal"
                    placeholder="Code"
                    type="text"
                    fullWidth
                  />
                  <Button
                    onClick={() =>
                      confirmUser(
                        userDispatch,
                        loginValue,
                        code,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      code.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Verify Email
                  </Button>
                </div>
                : null}

              {/* <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2014-2019 Flatlogic, LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);