import { FETCH_EVENT, FETCH_FAIL, FETCH_SUCCESS } from "../constants/actions-types";
  import axios from "axios";
  
  export const fetchEvent = () => async (dispatch) => {
    const res = await axios.get("http://localhost:8000/api/events");
    dispatch({
      type: FETCH_EVENT,
    });
    try {
      dispatch({
        type: FETCH_SUCCESS,
        payload: res.data.events,
      });
    } catch (error) {
      dispatch({
        type: FETCH_FAIL,
      });
    }
  };
  
  
  
  