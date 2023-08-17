import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { editEvent } from '../../../store/actions/eventActions';

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
 * Edit Event Form
 *
 * @component
 */
function EditEvent({ event, onClose }) {
  const classes = useStyles();
  const [link, setLink] = useState(event.link);
  const dispatch = useDispatch();
  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(editEvent(event.id, { link }));
    onClose();
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
        Edit Event : {event.title}
      </Typography>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
EditEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditEvent;
