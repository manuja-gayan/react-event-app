import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../../store/actions/messageActions';

const useStyles = makeStyles(theme => ({
  alert: {
    margin: theme.spacing(2),
  },
}));

/**
 * Error Messages
 *
 * @component
 */
function StatusMessages() {
  const classes = useStyles();
  const message = useSelector(state => state.message);

  const dispatch = useDispatch();

  const handleCloseError = () => dispatch(clearMessage());
  return message ? (
    <Alert
      severity={message.severity}
      className={classes.alert}
      onClose={handleCloseError}
    >
      <b>{message.text}</b>
    </Alert>
  ) : (
    <div />
  );
}

export default StatusMessages;
