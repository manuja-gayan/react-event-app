import {
  ADD_MESSAGE,
  CLEAR_MESSAGE,
} from '../actionTypes.js/messageActionTypes';

export const addMessage = message => dispatch => {
  dispatch({ type: ADD_MESSAGE, payload: message });
};

export const clearMessage = message => dispatch => {
  dispatch({ type: CLEAR_MESSAGE });
};
