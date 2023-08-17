import { Grid, Paper, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { Alert } from '@material-ui/lab';
import CsvDownload from 'react-json-to-csv';
import QATable from './QATable';
import qaFilter from './qaFilter';
import FilterByEvent from '../FilterByEvent';
import CircularProgressIndicator from '../../other/circularProgressIndicator';
import StatusMessages from '../eventComponents/StatusMessages';
import { clearMessage } from '../../../store/actions/messageActions';

/**
 * QA page
 *
 * @component
 */
function QA() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(clearMessage()), [dispatch]);

  const [selectedEvent, setSelectedEvent] = useState('all');
  let filteredQuestions = [];

  const handleChange = event => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    getFilteredQuestions(eventId);
  };

  const getFilteredQuestions = eventId => {
    if (isLoaded(questions) && questions.length > 0) {
      filteredQuestions = qaFilter(eventId, questions);
    }
  };

  useFirestoreConnect([
    { collection: 'questions', orderBy: ['time'] },
    { collection: 'events', orderBy: ['startingDateTime'] },
  ]);
  const questions = useSelector(state => state.firestore.ordered.questions);
  const events = useSelector(state => state.firestore.ordered.events);

  getFilteredQuestions(selectedEvent);

  if (!isLoaded(questions) || !isLoaded(events)) {
    return <CircularProgressIndicator boxHeight={window.innerHeight / 2} />;
  }

  const showItems = () => {
    if (isEmpty(filteredQuestions) && isLoaded(questions)) {
      return <Alert severity="info">Question List Is Empty</Alert>;
    }
    return <QATable filteredQuestions={filteredQuestions} />;
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
        Question Moderation
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
        {filteredQuestions.length > 0 && (
          <Grid item>
            <CsvDownload
              data={filteredQuestions}
              filename="questions.csv"
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

export default QA;
