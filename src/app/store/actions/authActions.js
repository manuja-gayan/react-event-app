import { fbAdmin } from '../../config/firebaseConfig';
import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DELETE_SUCCESS,
  DELETE_ERROR,
  USER_FETCH,
  USER_UPDATE_ERROR,
  USER_UPDATE_SUCCESS,
  RESET_AUTH_ERROR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
} from '../actionTypes.js/authActionTypes';

const userCollectionName = 'staff';

export const register =
  user =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    fbAdmin
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(resp =>
        firestore.collection(userCollectionName).doc(resp.user.uid).set({
          name: user.name,
          email: user.email,
          password: user.password,
          eventAccess: user.eventAccess,
          staffAccess: user.staffAccess,
          questionAccess: user.questionAccess,
          guestAccess: user.guestAccess,
          isDisabled: false,
        }),
      )
      .then(() => {
        fbAdmin
          .auth()
          .signOut()
          .then(() => {
            dispatch({ type: REGISTER_SUCCESS });
          });
      })
      .catch(error => {
        dispatch({ type: REGISTER_ERROR, error });
      });
  };

export const login =
  credentials =>
  (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: LOGIN_ERROR, error });
      });
  };

export const logout =
  () =>
  (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      });
  };

export const toggleDisableStaff =
  (staffId, value) =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    // const firebase = getFirebase();

    firestore
      .collection(userCollectionName)
      .doc(staffId)
      .update({ isDisabled: value })
      .then(() => dispatch({ type: DELETE_SUCCESS }))
      .catch(error => dispatch({ type: DELETE_ERROR, error }));
  };
// user credential aint deleted

export const getUser =
  userId =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(userCollectionName)
      .doc(userId)
      .get()
      .then(doc => dispatch({ type: USER_FETCH, user: doc.data() }));
  };

export const editUser =
  user =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(userCollectionName)
      .doc(user.id)
      .update({
        name: user.name,
        eventAccess: user.eventAccess,
        staffAccess: user.staffAccess,
        questionAccess: user.questionAccess,
        guestAccess: user.guestAccess,
      })
      .then(() => dispatch({ type: USER_UPDATE_SUCCESS }))
      .catch(err => dispatch({ type: USER_UPDATE_ERROR, err }));
  };

export const resetPassword =
  newPassword =>
  (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .currentUser.updatePassword(newPassword)
      .then(() => dispatch({ type: RESET_PASSWORD_SUCCESS }))
      .catch(err => dispatch({ type: RESET_PASSWORD_ERROR, error: err }));
  };

export const resetAuthError = () => dispatch => {
  dispatch({ type: RESET_AUTH_ERROR });
};
