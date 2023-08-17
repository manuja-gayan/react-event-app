import { Box, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
    minHeight: '95vh',
    padding: theme.spacing(2),
  },
}));
/**
 * Upcoming Event Page
 *
 * @component
 */
function TimerOnEvent({ event }) {
  const classes = useStyles();
  const countDownRenderer = ({ days, hours, minutes, seconds }) => (
    <span>
      {days.toString().padStart(2, '0')}d : {hours.toString().padStart(2, '0')}h
      : {minutes.toString().padStart(2, '0')}m :{' '}
      {seconds.toString().padStart(2, '0')}s
    </span>
  );
  return (
    <div>
      <CssBaseline />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={classes.container}
      >
        <div>
          <Typography variant="h2" color="primary" gutterBottom align="center">
            {event.title.toUpperCase()}
          </Typography>
          <Typography variant="h5" align="center">
            Conducted By
          </Typography>
          <Box m={1} />
          <Typography variant="h4" align="center">
            {event.conductor.toUpperCase()}
          </Typography>
          <Box m={3} />
          <Typography variant="h5" align="center" gutterBottom>
            <b>The Event Starting In</b>
          </Typography>
          <Box m={2} />
          <Typography variant="h2" align="center" color="secondary">
            <Countdown
              date={event.startingDateTime.seconds * 1000}
              renderer={countDownRenderer}
            />
          </Typography>
        </div>
      </Box>
    </div>
  );
}
TimerOnEvent.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TimerOnEvent;
