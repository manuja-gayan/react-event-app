import {
  NEW_QUESTION_SUCCESS,
  NEW_QUESTION_ERROR,
} from '../actionTypes.js/qaActionTypes';

const newQuestion =
  (eventID, guestID, name, email, questionBody) =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    firestore
      .collection('questions')
      .add({
        email,
        event: eventID,
        guest: guestID,
        name,
        question: questionBody,
        status: 'pending',
        time: Date.now(),
      })
      .then(res => {
        dispatch({ type: NEW_QUESTION_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: NEW_QUESTION_ERROR, questionBody, error });
      });
  };

export default newQuestion;
