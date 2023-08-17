import {
  Button,
  Grid,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  modal_div: {
    width: '50%',
  },
  modal: {
    alignItems: 'center',
    marginTop: theme.spacing(4),
    overflow: 'auto',
  },
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
 * Delete confirmation dialog
 *
 * @component
 */
function DeleteConfirmation({ isOpen, onDelete, onClose }) {
  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      aria-labelledby="event-modal-title"
      aria-describedby="event-modal-description"
      align="center"
      className={classes.modal}
    >
      <div className={classes.modal_div}>
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
            Are you sure ?
            <br />
            Click delete to continue.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Button
                type="close"
                align="right"
                variant="contained"
                color="default"
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
                color="secondary"
                className={classes.button}
                onClick={onDelete}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Modal>
  );
}
DeleteConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default DeleteConfirmation;
