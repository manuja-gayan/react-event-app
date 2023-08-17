export const UPCOMING_AND_LIVE_EVENTS = 'Upcoming and Live Events';
export const UPCOMING_EVENTS = 'Upcoming Events';
export const LIVE_EVENTS = 'Live Events';
export const FINISHED_EVENTS = 'Finished Events';
export const ALL_EVENTS = 'All Events';

/**
 * Events filter
 *
 * @component
 */
export function eventFilter(events, filter) {
  const filtered = [];
  if (filter === UPCOMING_AND_LIVE_EVENTS) {
    events.forEach(event => {
      if (!event.isEnd) {
        filtered.push(event);
      }
    });
    return filtered;
  }
  if (filter === UPCOMING_EVENTS) {
    events.forEach(event => {
      if (!event.isEnd && !event.isLive) {
        filtered.push(event);
      }
    });
    return filtered;
  }
  if (filter === LIVE_EVENTS) {
    events.forEach(event => {
      if (event.isLive && !event.isEnd) {
        filtered.push(event);
      }
    });
    return filtered;
  }
  if (filter === FINISHED_EVENTS) {
    events.forEach(event => {
      if (event.isEnd) {
        filtered.push(event);
      }
    });
    return filtered;
  }
  return events;
}
