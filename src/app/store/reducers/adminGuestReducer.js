import {
  DELETE_SUCCESS,
  DELETE_ERROR,
  EDIT_SUCCESS,
  EDIT_ERROR,
} from '../actionTypes.js/adminGuestActionTypes';

const initialState = { adminGuestError: null };

const adminGuestReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SUCCESS:
      return {
        ...state,
        adminGuestError: null,
      };
    case DELETE_ERROR:
      return {
        ...state,
        adminGuestError: 'Delete Failed',
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        adminGuestError: null,
      };
    case EDIT_ERROR:
      return {
        ...state,
        adminGuestError: 'Edit Failed',
      };
    default:
      return state;
  }
};

export default adminGuestReducer;
