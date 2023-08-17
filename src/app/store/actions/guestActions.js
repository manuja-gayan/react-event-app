import {
  GUEST_SUCCESS,
  GUEST_ERROR,
  GUEST_ENTERED_EVENT_SUCCESS,
  GUEST_ENTERED_EVENT_ERROR,
  UPDATE_LEAVE_SUCCESS,
  UPDATE_LEAVE_ERROR,
} from '../actionTypes.js/guestActionTypes';

export const insertGuest =
  guestObj =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    guestObj.events.forEach(event => {
      const id = event.concat(guestObj.email);
      firestore
        .collection('guests')
        .doc(id)
        .set({
          name: guestObj.name,
          email: guestObj.email,
          event,
          registeredInterest: true,
          attended: false,
          inOut: [],
        })
        .then(() => dispatch({ type: GUEST_SUCCESS }))
        .catch(error => dispatch({ type: GUEST_ERROR, error }));
    });
  };

export const updateEventAttendance =
  details =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const guestId = details.eventId.concat(details.email);
    firestore
      .collection('guests')
      .doc(guestId)
      .update({
        attended: true,
        inTime: firebase.firestore.FieldValue.arrayUnion(
          firebase.firestore.Timestamp.fromDate(new Date()),
        ),
      })
      .then(() => {
        dispatch({ type: GUEST_ENTERED_EVENT_SUCCESS, id: guestId });
      })
      .catch(err => {
        firestore
          .collection('guests')
          .doc(guestId)
          .set({
            attended: true,
            email: details.email,
            event: details.eventId,
            name: details.name,
            registeredInterest: false,
            inOut: [],
          })
          .then(() =>
            dispatch({ type: GUEST_ENTERED_EVENT_SUCCESS, id: guestId }),
          )
          .catch(er =>
            dispatch({ type: GUEST_ENTERED_EVENT_ERROR, error: er }),
          );
      });
  };

export const updateInTime =
  guestId =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore
      .collection('guests')
      .doc(guestId)
      .update({
        inOut: firebase.firestore.FieldValue.arrayUnion({
          in: firestore.Timestamp.fromDate(new Date()),
          out: firestore.Timestamp.fromDate(new Date()),
        }),
      })
      .then(() => dispatch({ type: UPDATE_LEAVE_SUCCESS }))
      .catch(err => {
        dispatch({ type: UPDATE_LEAVE_ERROR });
      });
  };

export const updateOutTime =
  guestId =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('guests')
      .doc(guestId)
      .get()
      .then(doc => {
        if (doc.exists) {
          const { inOut } = doc.data();

          if (inOut?.length > 0) {
            const lastIndex = inOut.length - 1;
            inOut[lastIndex] = {
              ...inOut[lastIndex],
              out: firestore.Timestamp.fromDate(new Date()),
            };
            doc.ref.update({ inOut });
          }
        }
      })
      .then(() => dispatch({ type: UPDATE_LEAVE_SUCCESS }))
      .catch(err => {
        dispatch({ type: UPDATE_LEAVE_ERROR });
      });
  };
