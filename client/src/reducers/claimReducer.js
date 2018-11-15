import { CLAIMS_LOADING, GET_CLAIMS } from "../actions/types";

const initialState = {
  claim: null,
  claims: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLAIMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CLAIMS:
      return {
        ...state,
        claims: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
