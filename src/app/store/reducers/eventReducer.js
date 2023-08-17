import {
  NEW_EVENT_ERROR,
  NEW_EVENT_SUCCESS,
  TIMER_START_SUCCESS,
  TIMER_START_ERROR,
  GO_LIVE_SUCCESS,
  GO_LIVE_ERROR,
  EVENT_END_SUCCESS,
  EVENT_END_ERROR,
  RESET_ERRORS,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_ERROR,
} from '../actionTypes.js/eventActionTypes';

const initState = {
  newEventError: null,
  editEventError: null,
  startTimerError: null,
  goLiveError: null,
  endEventError: null,
};

const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case NEW_EVENT_SUCCESS:
      return {
        ...state,
        newEventError: null,
        editEventError: null,
        startTimerError: null,
        goLiveError: null,
        endEventError: null,
      };
    case NEW_EVENT_ERROR:
      return {
        ...state,
        newEventError: action.error.message,
        editEventError: null,
        startTimerError: null,
        goLiveError: null,
        endEventError: null,
      };
    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        newEventError: null,
        editEventError: null,
        startTimerError: null,
        goLiveError: null,
        endEventError: null,
      };
    case EDIT_EVENT_ERROR:
      return {
        ...state,
        newEventError: null,
        editEventError: action.error.message,
        startTimerError: null,
        goLiveError: null,
        endEventError: null,
      };
    case TIMER_START_SUCCESS:
      return {
        ...state,
        newEventError: null,
        editEventError: null,
        startTimerError: null,
        goLiveError: null,
        endEventError: null,
      };
    case TIMER_START_ERROR:
      return {
        ...state,
        newEventError: null,
        editEventError: null,
        startTimerError: 'Could not start the timer. Please try again later',
        goLiveError: null,
        endEventError: null,
      };
    case GO_LIVE_SUCCESS:
      return {
        ...state,
        newEventError: null,
        editEventError: null,
        startTimerError: null,
        goLiveError: null,
        endEventError: null,
      };
    case GO_LIVE_ERROR:
      return {
        ...state,
        newEventError: null,
        editEventError: null,
        startTimerError: null,
        goLiveError: 'Could not start the live event. Please try again later',
        endEventError: null,
      };
    case EVENT_END_SUCCESS:
      return {
        ...state,
        newEventError: null,
        editEventError: null,
        startTimerError: null,
        goLiveError: null,
        endEventError: null,
      };
    case EVENT_END_ERROR:
      return {
        ...state,
        newEventError: null,
        editEventError: null,
        startTimerError: null,
        goLiveError: null,
        endEventError: 'Could not end the event. Please try again later',
      };
    case RESET_ERRORS:
      return {
        ...state,
        newEventError: null,
        editEventError: null,
        startTimerError: null,
        goLiveError: null,
        endEventError: null,
      };
    default:
      return state;
  }
};

export default eventReducer;
