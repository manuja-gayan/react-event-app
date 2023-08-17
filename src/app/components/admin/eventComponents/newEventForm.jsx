import {
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../../store/actions/eventActions';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
  },
  form: {
    width: '95%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    letterSpacing: theme.spacing(0.2),
  },
}));

/**
 * New Event Form
 *
 * @component
 */
function NewEvent({ onSubmitSuccess, onClose }) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [conductor, setConductor] = useState('');
  const [link, setLink] = useState('');
  const [startingDateTime, setStartingDateTime] = useState('');
  const [endingDateTime, setEndingDateTime] = useState('');
  const [localError, setLocalError] = useState('');
  const newEventError = useSelector(state => state.event.newEventError);
  const dispatch = useDispatch();
  const handleFormSubmit = e => {
    e.preventDefault();
    if (new Date(startingDateTime) < new Date()) {
      setLocalError('Invalid Starting Time');
    } else if (new Date(endingDateTime) < new Date(startingDateTime)) {
      setLocalError('Ending Time must be after Starting Time');
    } else {
      setLocalError('');
      dispatch(
        createEvent({
          title,
          subTitle,
          conductor,
          link,
          startingDateTime,
          endingDateTime,
        }),
      );
      if (newEventError !== null) {
        setLocalError(newEventError);
      } else if (newEventError === null) {
        onSubmitSuccess();
      }
    }
  };
  return (
    <Paper
      variant="outlined"
      align="center"
      width="50%"
      className={classes.paper}
    >
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        align="center"
      >
        Add Event
      </Typography>
      {localError ? <Alert severity="error">{localError}</Alert> : null}
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Event Title"
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Event SubTitle"
          name="subTitle"
          id="subTitle"
          type="text"
          value={subTitle}
          onChange={e => setSubTitle(e.target.value)}
          required
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Event Conductor"
              name="conductor"
              id="conductor"
              type="text"
              value={conductor}
              onChange={e => setConductor(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Event Link"
              id="link"
              name="link"
              type="text"
              value={link}
              onChange={e => setLink(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="startingDatetime"
              name="startingDatetime"
              type="datetime-local"
              label="Starting Time"
              InputLabelProps={{
                shrink: true,
              }}
              value={startingDateTime}
              onChange={e => setStartingDateTime(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="endingDatetime"
              name="endingDatetime"
              type="datetime-local"
              label="Ending Time"
              InputLabelProps={{
                shrink: true,
              }}
              value={endingDateTime}
              onChange={e => setEndingDateTime(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              type="close"
              align="right"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={onClose}
            >
              Close
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              align="right"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
NewEvent.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewEvent;
