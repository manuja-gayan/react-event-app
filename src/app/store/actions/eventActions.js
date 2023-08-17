import { RESET_ERRORS } from '../actionTypes.js/eventActionTypes';
import { ADD_MESSAGE } from '../actionTypes.js/messageActionTypes';

export const createEvent =
  eventData =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('events')
      .add({
        title: eventData.title,
        subTitle: eventData.subTitle,
        conductor: eventData.conductor,
        link: eventData.link,
        startingDateTime: new Date(eventData.startingDateTime),
        endingDateTime: new Date(eventData.endingDateTime),
        isTimer: false,
        isLive: false,
        isEnd: false,
      })
      .then(res => {
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'success', text: `${eventData.title} Added` },
        });
      })
      .catch(error => {
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'error', text: error },
        });
      });
  };

export const editEvent =
  (eventID, eventData) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('events')
      .doc(eventID)
      .update({ link: eventData.link })
      .then(res => {
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'success', text: 'Edit successfull' },
        });
      })
      .catch(error => {
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'error', text: error },
        });
      });
  };

export const startTimer =
  eventID =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();

    firestore
      .collection('events')
      .doc(eventID)
      .update({ isTimer: true })
      .then(() =>
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'success', text: 'Timer Started!' },
        }),
      )
      .catch(error =>
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'error', text: error },
        }),
      );
  };

export const goLive =
  eventID =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();

    firestore
      .collection('events')
      .doc(eventID)
      .update({ isLive: true })
      .then(() =>
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'success', text: 'Event is Live!' },
        }),
      )
      .catch(error =>
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'error', text: error },
        }),
      );
  };
export const endEvent =
  eventID =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();

    firestore
      .collection('events')
      .doc(eventID)
      .update({ isEnd: true })
      .then(() =>
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'success', text: 'Event ended!' },
        }),
      )
      .catch(error =>
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'error', text: error },
        }),
      );
  };

export const errorReset =
  () =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch({ type: RESET_ERRORS });
  };

const deleteEventGuests = (eventID, firestore) => {
  firestore
    .collection('guests')
    .where('event', '==', eventID)
    .get()
    .then(querySnapshot => {
      const batch = firestore.batch();
      querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      batch.commit();
    })
    .catch(err => {});
};

const deleteEventQnA = (eventID, firestore) => {
  firestore
    .collection('questions')
    .where('event', '==', eventID)
    .get()
    .then(querySnapshot => {
      const batch = firestore.batch();
      querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      batch.commit();
    })
    .catch(err => {});
};

export const deleteEvent =
  eventID =>
  (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();

    firestore
      .collection('events')
      .doc(eventID)
      .delete()
      .then(() => {
        deleteEventGuests(eventID, firestore);
        deleteEventQnA(eventID, firestore);
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'success', text: 'Timer Started!' },
        });
      })
      .catch(error =>
        dispatch({
          type: ADD_MESSAGE,
          payload: { severity: 'error', text: error },
        }),
      );
  };
