import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import adminGuestReducer from './adminGuestReducer';
import qaReducer from './qaReducer';
import guestReducer from './guestReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  firebase: firebaseReducer,
  adminGuest: adminGuestReducer,
  qa: qaReducer,
  guest: guestReducer,
  message: messageReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
