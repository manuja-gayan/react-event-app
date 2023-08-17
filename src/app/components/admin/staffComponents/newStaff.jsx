import {
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../store/actions/authActions';

const useStyles = makeStyles(theme => ({
  paper: {
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
 * New Staff
 *
 * @component
 */
function NewStaff({ handleAddStaffModelClose }) {
  const [checkboxstates, setCheckboxStates] = useState({
    checkedEvent: false,
    checkedStaff: false,
    checkedQA: false,
    checkedGuest: false,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerSucess] = useState('');

  const registerError = useSelector(state => state.auth.authError);
  const dispatch = useDispatch();

  const handleCheckboxChange = event => {
    setCheckboxStates({
      ...checkboxstates,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(register(user));
    handleAddStaffModelClose();
  };

  const user = {
    email,
    password,
    name,
    eventAccess: checkboxstates.checkedEvent,
    staffAccess: checkboxstates.checkedStaff,
    questionAccess: checkboxstates.checkedQA,
    guestAccess: checkboxstates.checkedGuest,
  };

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
        Add Staff
      </Typography>
      {registerError ? <Alert severity="error">{registerError}</Alert> : null}
      {registerSucess ? (
        <Alert severity="sucess">{registerSucess}</Alert>
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
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              align="right"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleAddStaffModelClose}
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
              className={classes.submit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
NewStaff.propTypes = {
  handleAddStaffModelClose: PropTypes.func.isRequired,
};

export default NewStaff;
