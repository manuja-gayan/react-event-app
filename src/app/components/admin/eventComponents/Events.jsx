import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  Modal,
  makeStyles,
  Grid,
  TableContainer,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import CsvDownload from 'react-json-to-csv';
import CircularProgressIndicator from '../../other/circularProgressIndicator';
import { eventFilter, UPCOMING_AND_LIVE_EVENTS } from './eventFilter';
import FilterComponent from './filterComponent';
import NewEvent from './newEventForm';
import SingleEventRow from './singleEventRow';
import EditEvent from './editEventForm';
import StatusMessages from './StatusMessages';
import { clearMessage } from '../../../store/actions/messageActions';
import { getDateTimeStr } from '../../../util/helpers';

const useStyles = makeStyles(theme => ({
  add_event_button: {
    margin: theme.spacing(1, 0, 1, 1),
    letterSpacing: theme.spacing(0.2),
  },
  active_color: {
    color: theme.palette.error.dark,
  },
  modal_div: {
    width: '50%',
  },
  modal: {
    alignItems: 'center',
    marginTop: theme.spacing(4),
    overflow: 'auto',
  },
  row_height: {
    height: theme.spacing(4),
  },
  alert: {
    width: '50%',
  },
  tableContainer: {
    maxHeight: '70vh',
  },
}));

const createEvent = data => ({
  id: data.id,
  title: data.title,
  subTitle: data.subTitle,
  conductor: data.conductor,
  link: data.link,
  startingDateTime: getDateTimeStr(data.startingDateTime.seconds * 1000),
  endingDateTime: getDateTimeStr(data.endingDateTime.seconds * 1000),
  isTimer: data.isTimer,
  isLive: data.isLive,
  isEnd: data.isEnd,
});

/**
 * Events page
 *
 * @component
 */
function Events() {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => dispatch(clearMessage()), [dispatch]);

  const [addEventModelState, setaddEventModelState] = useState(false);
  const [editEventModelState, setEditEventModelState] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [successMessage, setSuccessMessage] = useState();
  const [filterField, setFilterField] = useState(UPCOMING_AND_LIVE_EVENTS);

  const handleModelOpen = () => setaddEventModelState(true);
  const handleModelClose = () => setaddEventModelState(false);

  const handleNewEventSuccess = () => {
    handleModelClose();
    setSuccessMessage('New Event Added Successfully');
  };
  const handleCloseSucessMessage = () => setSuccessMessage();

  useFirestoreConnect([
    { collection: 'events', orderBy: ['startingDateTime'] },
  ]);
  const eventsRaw = useSelector(state => state.firestore.ordered.events);
  if (!isLoaded(eventsRaw)) {
    return <CircularProgressIndicator boxHeight={window.innerHeight / 2} />;
  }

  const filteredEvents = eventFilter(eventsRaw, filterField);
  const events = filteredEvents.map(createEvent);

  const handleEditModelOpen = eventID => {
    const event = events.find(({ id }) => id === eventID);
    setSelectedEvent(event);
    setEditEventModelState(true);
  };
  const handleEditModelClose = () => {
    setSelectedEvent();
    setEditEventModelState(false);
  };

  return (
    <div align="center">
      <Typography
        component="h2"
        variant="h5"
        color="primary"
        gutterBottom
        align="center"
      >
        Events
      </Typography>
      {successMessage && (
        <Alert
          severity="success"
          className={classes.alert}
          onClose={handleCloseSucessMessage}
        >
          <b>{successMessage}</b>
        </Alert>
      )}
      <StatusMessages />
      <Grid direction="row" container justify="space-between">
        <Grid item xs={8}>
          <FilterComponent
            filterField={filterField}
            onFilterChange={setFilterField}
          />
        </Grid>
        <Grid>
          {events.length > 0 && (
            <CsvDownload
              data={events}
              filename="events.csv"
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary"
            >
              Export CSV
            </CsvDownload>
          )}
          <Button
            align="right"
            variant="contained"
            color="primary"
            onClick={handleModelOpen}
            className={classes.add_event_button}
          >
            Add Event
          </Button>
        </Grid>
      </Grid>

      <Modal
        open={addEventModelState}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
        align="center"
        className={classes.modal}
      >
        <div className={classes.modal_div}>
          <NewEvent
            onSubmitSuccess={handleNewEventSuccess}
            onClose={handleModelClose}
          />
        </div>
      </Modal>
      <Modal
        open={editEventModelState}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
        align="center"
        className={classes.modal}
      >
        <div className={classes.modal_div}>
          {selectedEvent && (
            <EditEvent event={selectedEvent} onClose={handleEditModelClose} />
          )}
        </div>
      </Modal>
      <Paper>
        {events.length > 0 ? (
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader size="medium">
              <TableHead>
                <TableRow className={classes.row_height}>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Sub Title</TableCell>
                  <TableCell align="center">Conductor</TableCell>
                  <TableCell align="center">Link</TableCell>
                  <TableCell align="center">Date & Time</TableCell>
                  <TableCell align="center">Start Timer</TableCell>
                  <TableCell align="center">Make Live</TableCell>
                  <TableCell align="center">End Event</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map(event => (
                  <SingleEventRow
                    event={event}
                    onEdit={handleEditModelOpen}
                    key={event.id}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ height: window.innerHeight / 2 }}
          >
            <Alert severity="warning">
              <b>No Events to Display</b>
            </Alert>
          </Box>
        )}
      </Paper>
    </div>
  );
}

export default Events;
