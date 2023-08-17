import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import CircularProgressIndicator from '../other/circularProgressIndicator';
import FinishedEvent from './eventPageComponents/FinishedEvent';
import LiveEvent from './eventPageComponents/LiveEvent';
import TimerOnEvent from './eventPageComponents/TimerOnEvent';
import UpcomingEvent from './eventPageComponents/UpcomingEvent';

/**
 *  User EventPage
 *
 * @component
 */
function EventPage() {
  const { id } = useParams();
  useFirestoreConnect([
    {
      collection: 'events',
      doc: id,
    },
  ]);
  const event = useSelector(
    ({ firestore: { data } }) => data.events && data.events[id],
  );
  if (!isLoaded(event)) {
    return <CircularProgressIndicator />;
  }
  // No such Event
  if (isEmpty(event)) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ height: window.innerHeight }}
      >
        <Alert severity="error">
          <b>No Such Event Found</b>
        </Alert>
      </Box>
    );
  }
  // Upcoming Event
  if (!event.isTimer && !event.isLive && !event.isEnd) {
    return <UpcomingEvent event={event} />;
  }
  // Timer Started Event
  if (event.isTimer && !event.isLive && !event.isEnd) {
    return <TimerOnEvent event={event} />;
  }
  // Live Event
  if (event.isLive && !event.isEnd) {
    return <LiveEvent event={event} />;
  }
  return <FinishedEvent event={event} />;
}

export default EventPage;
