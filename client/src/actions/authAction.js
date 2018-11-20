import axios from "axios";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

import { SET_CURRENT_USER, GET_ERRORS, AUTH_LOADING } from "./types";

const network = {
  blockchain: "eos",
  protocol: "https",
  host: "api-kylin.eosasia.one",
  port: 443,
  chainId: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
};
// Declare your network. For local, substitute with the appropriate values below. Dont forget the chain ID!

// Declare the type (EOS)
ScatterJS.plugins(new ScatterEOS());

let scatter;

export const authorize = () => async dispatch => {
  console.log("authenicating");

  dispatch(setAuthLoading());
  ScatterJS.scatter.connect("eosiowitness").then(connected => {
    // User does not have Scatter Desktop, Mobile or Classic installed.
    if (!connected) return false;

    scatter = ScatterJS.scatter;

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

        axios
          .post("http://localhost:4000/api/v1/profile", {
            user: scatter.identity.accounts[0].name
          })
          .then(res => {
            dispatch(setCurrentUser(ScatterJS.scatter));
          })
          .catch(err => {
            dispatch({
              type: GET_ERRORS,
              payload: err
            });
          });
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
  // scatter.forgetIdentity();
  // Redirect to login
  window.location.href = "/";
};

// Set logged in user
export const setCurrentUser = scatter => {
  return {
    type: SET_CURRENT_USER,
    payload: scatter
  };
};

// Profile loading
export const setAuthLoading = () => {
  return {
    type: AUTH_LOADING
  };
};
