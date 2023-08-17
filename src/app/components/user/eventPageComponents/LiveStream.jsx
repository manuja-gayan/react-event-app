import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import {
  updateInTime,
  updateOutTime,
} from '../../../store/actions/guestActions';

import CircularProgressIndicator from '../../other/circularProgressIndicator';
import PageContainer from '../homePageComponents/PageContainer';
import QuestionsSection from './QuestionsSection';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBox: {
    height: 250,
    background: 'black',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  iframe: {
    width: '100%',
    height: '100%',
  },
}));
/**
 * Live Stream Page
 *
 *@component
 */
function LiveStream({ eventDetails, guestId }) {
  const classes = useStyles();
  const split = eventDetails.link.split('/');
  const vimeoVidID = split[split.length - 1];
  const dispatch = useDispatch();
  useFirestoreConnect([
    {
      collection: 'guests',
      doc: guestId,
      storeAs: 'questionGuest',
    },
  ]);
  const guest = useSelector(state => state.firestore.data.questionGuest);

  useEffect(() => {
    dispatch(updateInTime(guestId));
  }, [dispatch, guestId]);

  useEffect(() => {
    const timer = setInterval(() => dispatch(updateOutTime(guestId)), 60000);
    return () => clearInterval(timer);
  }, [dispatch, guestId]);

  if (!isLoaded(guest)) {
    return <CircularProgressIndicator />;
  }

  return (
    <PageContainer className={classes.root}>
      <Grid container direction="row" alignItems="flex-end">
        <Grid item container direction="column" xs={12} md={8}>
          <Typography variant="h4" color="primary" gutterBottom align="center">
            {eventDetails.title.toUpperCase()}
          </Typography>
          <Typography align="center">Conducted By</Typography>
          <Typography variant="h6" align="center">
            {eventDetails.conductor.toUpperCase()}
          </Typography>
          <Box m={1} />
          <Box className={classes.videoBox}>
            <iframe
              src={`https://player.vimeo.com/video/${vimeoVidID}`}
              frameBorder="0"
              allowFullScreen
              title="Event"
              className={classes.iframe}
            />
          </Box>
        </Grid>

        <Grid item sm={12} md={4}>
          <QuestionsSection
            eventID={guest.event}
            guestID={guestId}
            name={guest.name}
            email={guest.email}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
LiveStream.propTypes = {
  eventDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  guestId: PropTypes.string.isRequired,
};

export default LiveStream;
