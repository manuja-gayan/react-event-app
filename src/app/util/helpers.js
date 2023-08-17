const timeFormat = { hour: '2-digit', minute: '2-digit' };
const dateFormat = { year: '2-digit', month: 'short', day: 'numeric' };
export const getDateTimeStr = val =>
  new Date(val).toLocaleString([], {
    ...dateFormat,
    ...timeFormat,
  });

export const getDateStr = val => new Date(val).toDateString([], dateFormat);

export const getTimeStr = val =>
  new Date(val).toLocaleTimeString([], timeFormat);
