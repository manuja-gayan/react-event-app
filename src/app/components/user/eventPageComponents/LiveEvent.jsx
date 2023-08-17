import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateEventAttendance } from '../../../store/actions/guestActions';
import CircularProgressIndicator from '../../other/circularProgressIndicator';
import PageContainer from '../homePageComponents/PageContainer';
import LiveStream from './LiveStream';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainGrid: {
    margin: 'auto',
  },
  form: {
    alignItems: 'center',
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
/**
 * Live Event
 *
 *  @component
 */
function LiveEvent({ event }) {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [guestName, setguestName] = useState('');
  const [boolJoinClicked, setBoolJoinClicked] = useState(false);
  const guestId = useSelector(state => state.guest.guestId);
  const details = {
    email,
    eventId: id,
    name: guestName,
  };

  const handleSubmitEvent = e => {
    e.preventDefault();
    dispatch(updateEventAttendance(details));
    setBoolJoinClicked(true);
  };
  if (boolJoinClicked && guestId === null) {
    return <CircularProgressIndicator />;
  }
  if (guestId) return <LiveStream eventDetails={event} guestId={guestId} />;
  return (
    <PageContainer className={classes.root}>
      <Grid
        container
        className={classes.mainGrid}
        justify="center"
        alignItems="center"
      >
        <Grid item md={8}>
          <Typography variant="h4" color="primary" gutterBottom align="center">
            {event.title.toUpperCase()}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom align="center">
            {event.subTitle.toUpperCase()}
          </Typography>
          <Typography variant="h6" align="center">
            Conducted By
          </Typography>
          <Typography variant="h5" align="center">
            {event.conductor}
          </Typography>
          <Box m={3} />
        </Grid>
        <Grid item md={4}>
          <Typography variant="h5" color="primary" gutterBottom>
            JOIN NOW !!
          </Typography>
          <form className={classes.form} onSubmit={handleSubmitEvent}>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              fullWidth
              label="Name"
              name="name"
              id="name"
              type="text"
              value={guestName}
              onChange={e => setguestName(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Join
            </Button>
          </form>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

LiveEvent.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LiveEvent;
