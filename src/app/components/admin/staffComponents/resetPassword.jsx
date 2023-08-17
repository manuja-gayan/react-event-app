import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../../store/actions/authActions';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
/**
 * reset password page
 *
 * @component
 */
function ResetPassword() {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);
  const resetPasswordError = useSelector(
    state => state.auth.resetPasswordError,
  );
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [redirectState, setRedirectState] = useState(null);

  const handleSubmitEvent = e => {
    e.preventDefault();
    setValidationError(null);
    if (password !== retypePassword) {
      setValidationError("Passwords don't match");
    } else if (password === '') {
      setValidationError('Passwords can not be empty');
    } else {
      setValidationError(null);
      dispatch(resetPassword(password));
      setTimeout(() => {
        if (!resetPasswordError) setRedirectState('success');
        setValidationError(resetPasswordError);
        setRedirectState('error');
      }, 3000);
    }
  };

  if (redirectState === 'success') {
    return <Redirect to="/admin" />;
  }

  if (redirectState === 'error') {
    setRedirectState(null);
    return <Redirect to="/admin/reset-password" />;
  }

  if (!auth.uid) return <Redirect to="/admin/login" />;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmitEvent}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="renter-password"
            label="Retype Password"
            type="password"
            id="reenter-password"
            value={retypePassword}
            onChange={e => setRetypePassword(e.target.value)}
          />
          {validationError ? (
            <Alert severity="error">{validationError}</Alert>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
        {/* <div>{authError ? <p>{authError}</p> : null}</div> */}
      </div>
    </Container>
  );
}
export default ResetPassword;
