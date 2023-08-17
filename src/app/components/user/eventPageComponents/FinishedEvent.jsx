import { Box, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

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
function FinishedEvent({ event }) {
  const classes = useStyles();
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
          <Box m={4} />
          <Typography
            variant="h5"
            align="center"
            color="secondary"
            gutterBottom
          >
            This Event is <b>FINISHED</b>.
          </Typography>
        </div>
      </Box>
    </div>
  );
}
FinishedEvent.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FinishedEvent;
