import { ADD_MESSAGE } from '../actionTypes.js/messageActionTypes';

const qaModerate =
  (id, status) =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    if (status) {
      firestore
        .collection('questions')
        .doc(id)
        .update({ status: 'approved' })
        .then(() =>
          dispatch({
            type: ADD_MESSAGE,
            payload: { severity: 'success', text: 'Question Approved!' },
          }),
        )
        .catch(error =>
          dispatch({
            type: ADD_MESSAGE,
            payload: { severity: 'error', text: error },
          }),
        );
    } else {
      firestore
        .collection('questions')
        .doc(id)
        .update({ status: 'declined' })
        .then(() =>
          dispatch({
            type: ADD_MESSAGE,
            payload: { severity: 'success', text: 'Question Declined!' },
          }),
        )
        .catch(error =>
          dispatch({
            type: ADD_MESSAGE,
            payload: { severity: 'error', text: error },
          }),
        );
    }
  };

export default qaModerate;
