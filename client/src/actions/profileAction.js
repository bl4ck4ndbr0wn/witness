import axios from "axios";
import { Api, JsonRpc, RpcError, JsSignatureProvider } from "eosjs";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

const url = "http://localhost:4000/api/v1";
// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${url}/profile/user/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${url}/profile/all`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Upload Documents
export const documentUpload = (imageUpload, user, history) => dispatch => {
  axios
    .post(`${url}/profile/photo/${user}`, imageUpload)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create Profile
export const createProfile = async (profileData, history) => dispatch => {
  console.log(profileData);
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
