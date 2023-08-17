import {
  EDIT_SUCCESS,
  EDIT_ERROR,
} from '../actionTypes.js/adminGuestActionTypes';
import { ADD_MESSAGE } from '../actionTypes.js/messageActionTypes';

export const deleteGuest =
  guestID =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    firestore
      .collection('guests')
      .doc(guestID)
      .get()
      .then(guest => {
        firestore
          .collection('guests')
          .doc(guestID)
          .delete()
          .then(() => {
            firestore
              .collection('questions')
              .where('event', '==', guest.data().event)
              .where('guest', '==', guestID)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  firestore.collection('questions').doc(doc.id).delete();
                });
              });
          });
      })
      .then(() =>
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'success', text: 'Guest details deleted!' },
        }),
      )
      .catch(error =>
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'error', text: error },
        }),
      );
  };

export const editGuest =
  guest =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();

    firestore
      .collection('guests')
      .doc(guest.id)
      .update({ ...guest })
      .then(() => dispatch({ type: EDIT_SUCCESS }))
      .catch(error => dispatch({ type: EDIT_ERROR, error }));
  };
