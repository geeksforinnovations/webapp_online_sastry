import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./components/App";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

//AWS
import Amplify from 'aws-amplify';
import config from './config';

import store from "./store";
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_dPgmvHwW6NDdnISsEJ5BGbJB00XsWEGgQK');
Amplify.configure({
  API: {
    endpoints: [
      {
        name: "pujas",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "pujaries",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "payments",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "mail",
        endpoint: config.apiGateway.MailURL,
        region: config.apiGateway.REGION
      },
      {
        name: "bookings",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  },
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
});

ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider>
      <UserProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <Elements stripe={stripePromise}>
          <App />
          </Elements>
        </ThemeProvider>
      </UserProvider>
    </LayoutProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
