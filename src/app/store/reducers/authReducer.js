import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  DELETE_SUCCESS,
  DELETE_ERROR,
  USER_FETCH,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  RESET_AUTH_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../actionTypes.js/authActionTypes';

const initialState = {
  authError: null,
  deleteError: null,
  user: '',
  updateError: null,
  resetPasswordError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        authError: null,
        deleteError: null,
        updateError: null,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        authError: action.error.message,
        deleteError: null,
        updateError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
        deleteError: null,
        updateError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: 'Login Failed',
        user: '',
        deleteError: null,
        updateError: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: '',
        authError: null,
        deleteError: null,
        updateError: null,
      };
    case DELETE_SUCCESS:
      return state;
    case DELETE_ERROR:
      return {
        ...state,
        deleteError: action.error.message,
        updateError: null,
        authError: null,
      };
    case USER_FETCH:
      return {
        ...state,
        user: action.user,
      };
    case USER_UPDATE_SUCCESS:
      return state;
    case USER_UPDATE_ERROR:
      return {
        ...state,
        updateError: action.err,
      };
    case RESET_AUTH_ERROR:
      return {
        ...state,
        authError: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordError: null,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordError: action.error.message,
      };
    default:
      return state;
  }
};

export default authReducer;
