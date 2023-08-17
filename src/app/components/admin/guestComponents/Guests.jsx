import { Grid, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CsvDownload from 'react-json-to-csv';
import GuestTable from './guestTable';
import guestFilter from './guestFilter';
import FilterByEvent from '../FilterByEvent';
import CircularProgressIndicator from '../../other/circularProgressIndicator';
import StatusMessages from '../eventComponents/StatusMessages';
import { clearMessage } from '../../../store/actions/messageActions';

/**
 * Guests page
 *
 * @component
 */
function Guests() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(clearMessage()), [dispatch]);
  const [selectedEvent, setSelectedEvent] = useState('all');
  let filteredGuests = [];

  const handleChange = event => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    getFilteredGuests(eventId);
  };

  const getFilteredGuests = eventId => {
    if (isLoaded(guests) && guests.length > 0) {
      filteredGuests = guestFilter(eventId, guests);
    }
  };

  useFirestoreConnect([
    { collection: 'guests', orderBy: ['name'] },
    { collection: 'events', orderBy: ['startingDateTime'] },
  ]);

  const guests = useSelector(state => state.firestore.ordered.guests);
  const events = useSelector(state => state.firestore.ordered.events);

  getFilteredGuests(selectedEvent);

  if (!isLoaded(guests) || !isLoaded(events)) {
    return <CircularProgressIndicator boxHeight={window.innerHeight / 2} />;
  }

  const showItems = () => {
    if (isEmpty(filteredGuests) && isLoaded(guests)) {
      return <Alert severity="info">Guest List Is Empty</Alert>;
    }
    return <GuestTable filteredGuests={filteredGuests} />;
  };

  return (
    <div>
      <Typography
        component="h2"
        variant="h5"
        color="primary"
        gutterBottom
        align="center"
      >
        Guests
      </Typography>
      <StatusMessages />
      <Grid direction="row" container justify="space-between">
        <Grid item xs={8}>
          <FilterByEvent
            selectedEvent={selectedEvent}
            handleChange={handleChange}
            events={events}
          />
        </Grid>
        {filteredGuests.length > 0 && (
          <Grid item>
            <CsvDownload
              data={filteredGuests}
              filename="guests.csv"
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary"
            >
              Export CSV
            </CsvDownload>
          </Grid>
        )}
      </Grid>
      <Paper>{showItems()}</Paper>
    </div>
  );
}

export default Guests;
