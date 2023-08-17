import {
  TableCell,
  TableRow,
  makeStyles,
  Button,
  Fab,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Delete, Edit as EditIcon } from '@material-ui/icons';
import { useState } from 'react';
import {
  deleteEvent,
  endEvent,
  goLive,
  startTimer,
} from '../../../store/actions/eventActions';
import DeleteConfirmation from '../DeleteConfirmation';

const useStyles = makeStyles(theme => ({
  add_event_button: {
    margin: theme.spacing(1, 0, 1),
    letterSpacing: theme.spacing(0.2),
  },
  active_color: {
    color: theme.palette.secondary.main,
  },
  modal_div: {
    width: '50%',
    alignItems: 'center',
  },
  row_height: {
    height: theme.spacing(10),
  },
  timeSpan: {
    whiteSpace: 'nowrap',
    wordBreak: 'strict',
  },
}));

/**
 * Event page
 *
 * @component
 */
function SingleEventRow({ event, onEdit }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const startTimerHandler = eventID => {
    dispatch(startTimer(eventID));
  };
  const goLiveHandler = eventID => {
    dispatch(goLive(eventID));
  };
  const endEventHandler = eventID => {
    dispatch(endEvent(eventID));
  };

  const [isOpen, setIsOpen] = useState(false);
  const openModel = () => {
    setIsOpen(true);
  };
  const closeModel = () => setIsOpen(false);

  const onDelete = () => {
    dispatch(deleteEvent(event.id));
    closeModel();
  };

  return (
    <TableRow className={classes.row_height}>
      <TableCell align="center">{event.title}</TableCell>
      <TableCell align="center">{event.subTitle}</TableCell>
      <TableCell align="center">{event.conductor}</TableCell>
      <TableCell align="center">
        <a href={event.link}>
          ...{event.link.substring(event.link.length - 12, event.link.length)}
        </a>
      </TableCell>
      <TableCell align="center">
        <span className={classes.timeSpan}>{event.startingDateTime}</span>
        <br />
        <span className={classes.timeSpan}>{event.endingDateTime}</span>
      </TableCell>
      <TableCell align="center">
        {event.isTimer && !event.isLive && !event.isEnd ? (
          <b className={classes.active_color}>Timer Active</b>
        ) : (
          [
            !event.isLive && !event.isEnd ? (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                key={0}
                onClick={() => startTimerHandler(event.id)}
              >
                Start Timer
              </Button>
            ) : (
              <b key={1}>Not Available</b>
            ),
          ]
        )}
      </TableCell>
      <TableCell align="center">
        {event.isLive && !event.isEnd ? (
          <b className={classes.active_color}>Event is Live</b>
        ) : (
          [
            !event.isEnd ? (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                key={0}
                onClick={() => goLiveHandler(event.id)}
              >
                Go Live
              </Button>
            ) : (
              <b key={1}>Not Available</b>
            ),
          ]
        )}
      </TableCell>
      <TableCell align="center">
        {event.isEnd ? (
          <b className={classes.active_color}>Event Ended</b>
        ) : (
          [
            event.isLive ? (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                key={0}
                onClick={() => endEventHandler(event.id)}
              >
                End Event
              </Button>
            ) : (
              <b key={1}>Not Available</b>
            ),
          ]
        )}
      </TableCell>
      <TableCell>
        <Fab
          disabled={event.isLive || event.isEnd}
          onClick={() => onEdit(event.id)}
          size="medium"
          color="primary"
          aria-label="edit"
        >
          <EditIcon />
        </Fab>
      </TableCell>
      <TableCell align="center">
        <Fab
          onClick={openModel}
          size="medium"
          color="secondary"
          aria-label="delete"
        >
          <Delete />
        </Fab>
        <DeleteConfirmation
          isOpen={isOpen}
          onClose={closeModel}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
SingleEventRow.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default SingleEventRow;
