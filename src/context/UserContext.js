import React from "react";
import { Auth } from "aws-amplify";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
        return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  //const isAuthenticated = await Auth.currentAuthenticatedUser()
  //console.log('isAuthenticated',isAuthenticated)
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: false
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

async function loginUser(
  dispatch,
  login,
  password,
  history,
  setIsLoading,
  setError
) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    try {
      //const user = await Auth.signIn(login, password);
      //const result = await Auth.completeNewPassword(user,'manikumar')
     // console.log('login user data', user)
     // alert("user logged in");
      dispatch({ type: "LOGIN_SUCCESS" });
      setError(null);
      setIsLoading(false);
      history.push("/app/pujas/new");
    } catch (error) {
      console.error("err is", error);
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);
    }

    // setTimeout(() => {
    //   localStorage.setItem("id_token", "1");
    //   dispatch({ type: "LOGIN_SUCCESS" });
    //   setError(null);
    //   setIsLoading(false);

    //   history.push("/app/dashboard");
    // }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

async function signOut(dispatch, history) {
  try {
    await Auth.signOut()
    console.log("logout")
    dispatch({ type: "SIGN_OUT_SUCCESS" });
    history.push("/login");
  } catch (error) {
    alert('unable to logout')
  }
 
}
