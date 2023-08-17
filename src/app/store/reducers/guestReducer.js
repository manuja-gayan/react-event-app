import {
  GUEST_SUCCESS,
  GUEST_ERROR,
  GUEST_ENTERED_EVENT_SUCCESS,
  GUEST_ENTERED_EVENT_ERROR,
  UPDATE_LEAVE_SUCCESS,
  UPDATE_LEAVE_ERROR,
} from '../actionTypes.js/guestActionTypes';

const initialState = { guestError: null, guestId: null, guestEnterError: null };

const guestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GUEST_SUCCESS:
      return {
        ...state,
        guestError: null,
      };
    case GUEST_ERROR:
      return {
        ...state,
        guestError: 'Guest Subscription Failed',
      };
    case GUEST_ENTERED_EVENT_SUCCESS:
      return {
        ...state,
        guestEnterError: null,
        guestId: action.id,
      };
    case GUEST_ENTERED_EVENT_ERROR:
      return {
        ...state,
        guestId: null,
        guestEnterError: action.error,
      };
    case UPDATE_LEAVE_SUCCESS:
      return state;
    case UPDATE_LEAVE_ERROR:
      return state;

    default:
      return state;
  }
};

export default guestReducer;
