import {
    FETCH_EVENT, FETCH_FAIL, FETCH_SUCCESS,
  } from "../constants/actions-types";
  
  const initialState = {
    loading: false,
    events: [],
  };
  
  const eventReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case FETCH_EVENT:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SUCCESS:
        return {
          ...state,
          loading: false,
          events: payload,
        };
      case FETCH_FAIL:
        return {
          ...state,
          loading: false,
          errors: payload,
        };  
      default:
        return state;
    }
  };
  export default eventReducer;
  