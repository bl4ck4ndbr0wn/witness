import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

import { SET_CURRENT_USER, GET_ERRORS, AUTH_LOADING } from "./types";

const network = {
  blockchain: "eos",
  protocol: "http",
  host: "127.0.0,1",
  port: 8888,
  chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f"
};
// Declare your network. For local, substitute with the appropriate values below. Dont forget the chain ID!

// Declare the type (EOS)
ScatterJS.plugins(new ScatterEOS());

export const authorize = () => async dispatch => {
  console.log("authenicating");

  dispatch(setAuthLoading());
  ScatterJS.scatter.connect("eosiowitness").then(connected => {
    // User does not have Scatter Desktop, Mobile or Classic installed.
    if (!connected) return false;

    const scatter = ScatterJS.scatter;

    // Declare your required fields here.
    const requiredFields = {
      accounts: [network]
    };
    scatter
      .getIdentity(requiredFields)
      .then(() => {
        const account = scatter.identity.accounts.find(
          x => x.blockchain === "eos"
        );

        if (ScatterJS.scatter) {
          // Set account to ls
          localStorage.setItem("scatter", JSON.stringify(scatter));
        }

        dispatch(setCurrentUser(ScatterJS.scatter));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );

    // Null out the scatter reference to prevent other plugins trying to call a valid scatter instance on the user's browser.
    window.ScatterJS = null;
  });
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove accountDetails from localStorage
  localStorage.removeItem("scatter");
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Profile loading
export const setAuthLoading = () => {
  return {
    type: AUTH_LOADING
  };
};
