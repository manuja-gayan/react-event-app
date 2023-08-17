import {
  ADD_MESSAGE,
  CLEAR_MESSAGE,
} from '../actionTypes.js/messageActionTypes';

const initialState = [];

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return action.payload;
    case CLEAR_MESSAGE:
      return null;
    default:
      return state;
  }
};

export default messageReducer;
