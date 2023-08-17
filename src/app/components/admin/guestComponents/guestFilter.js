import { getTimeStr } from '../../../util/helpers';

const getInTime = arr => {
  if (arr && arr?.length > 0) {
    return getTimeStr(arr[0].in.seconds * 1000);
  }
  return undefined;
};

const getOutTime = arr => {
  if (arr && arr?.length > 0) {
    return getTimeStr(arr[arr.length - 1].out.seconds * 1000);
  }
  return undefined;
};

const createData = g => ({
  id: g.id,
  name: g.name,
  email: g.email,
  registeredInterest: g.registeredInterest,
  attended: g.attended,
  inTime: getInTime(g.inOut),
  outTime: getOutTime(g.inOut),
  inOut: g.inOut?.map(({ in: inTime, out: outTime }) => ({
    in: getTimeStr(inTime.seconds * 1000),
    out: getTimeStr(outTime.seconds * 1000),
  })),
});

/**
 * @param {string} eventId event ID
 * @param {Array} guests guest list
 * @returns {Array} filteredGuests
 */
function guestFilter(eventId, guests) {
  const filteredGuests = [];
  if (eventId === 'all') {
    guests.forEach(guest => {
      filteredGuests.push(createData(guest));
    });
  } else {
    guests.forEach(guest => {
      if (guest.event === eventId) {
        filteredGuests.push(createData(guest));
      }
    });
  }
  return filteredGuests;
}

export default guestFilter;
