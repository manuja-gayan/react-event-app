import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import { editUser } from '../../../store/actions/authActions';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '50%',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
  },
  form: {
    width: '75%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    letterSpacing: theme.spacing(0.2),
  },
}));

/**
 * Edit Staff
 *
 * @component
 */
function EditStaff(props) {
  const {
    id,
    name,
    eventAccess,
    staffAccess,
    questionAccess,
    guestAccess,
    handleEditStaffModelClose,
  } = props;
  const [checkboxstates, setCheckboxStates] = useState({
    checkedEvent: eventAccess,
    checkedStaff: staffAccess,
    checkedQA: questionAccess,
    checkedGuest: guestAccess,
  });

  const [username, setUsername] = useState(name);
  const [sucessMssg, setSucessMssg] = useState(null);
  const [fieldError, setFieldError] = useState(null);

  const handleCheckboxChange = event => {
    setCheckboxStates({
      ...checkboxstates,
      [event.target.name]: event.target.checked,
    });
  };

  const editedUser = {
    id,
    name: username,
    eventAccess: checkboxstates.checkedEvent,
    staffAccess: checkboxstates.checkedStaff,
    questionAccess: checkboxstates.checkedQA,
    guestAccess: checkboxstates.checkedGuest,
  };

  const handleFormSubmit = e => {
    setFieldError('');
    e.preventDefault();
    if (username === '') {
      setFieldError('Name can not be empty!!');
    } else if (
      !(
        checkboxstates.checkedEvent ||
        checkboxstates.checkedStaff ||
        checkboxstates.checkedQA ||
        checkboxstates.checkedGuest
      )
    ) {
      setFieldError('You must select at least one access type!!');
    } else {
      setFieldError('');
      dispatch(editUser(editedUser));
      setSucessMssg('Staff information edited successfully');
    }
  };

  const editError = useSelector(state => state.auth.updateError);
  const dispatch = useDispatch();

  const classes = useStyles();
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
        Edit Staff
      </Typography>
      {fieldError || editError ? (
        <Alert severity="error">{fieldError || editError}</Alert>
      ) : null}
      {sucessMssg ? (
        <Alert severity="success">
          {' '}
          <b>{sucessMssg}</b>
        </Alert>
      ) : null}
      <form noValidate className={classes.form} onSubmit={handleFormSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          autoFocus
          fullWidth
          label="Staff Name"
          name="name"
          id="name"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxstates.checkedEvent}
                onChange={handleCheckboxChange}
                name="checkedEvent"
                color="primary"
              />
            }
            label="Event Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxstates.checkedStaff}
                onChange={handleCheckboxChange}
                name="checkedStaff"
                color="primary"
              />
            }
            label="Staff Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxstates.checkedQA}
                onChange={handleCheckboxChange}
                name="checkedQA"
                color="primary"
              />
            }
            label="Q&A Access"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxstates.checkedGuest}
                onChange={handleCheckboxChange}
                name="checkedGuest"
                color="primary"
              />
            }
            label="Guest Access"
          />
        </FormGroup>
        <ButtonGroup>
          <Button
            align="right"
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleEditStaffModelClose}
          >
            Close
          </Button>

          <Button
            type="submit"
            align="right"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
        </ButtonGroup>
      </form>
    </Paper>
  );
}
EditStaff.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  eventAccess: PropTypes.bool.isRequired,
  staffAccess: PropTypes.bool.isRequired,
  questionAccess: PropTypes.bool.isRequired,
  guestAccess: PropTypes.bool.isRequired,
  handleEditStaffModelClose: PropTypes.func.isRequired,
};
export default EditStaff;
