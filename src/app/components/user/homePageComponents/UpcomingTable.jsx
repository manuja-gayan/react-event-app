import {
  Box,
  Button,
  Card,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import { isEmpty } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import { insertGuest } from '../../../store/actions/guestActions';

const useStyles = makeStyles(theme => ({
  paperTable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
  },
  tableContainer: {
    maxHeight: 400,
  },
  paperForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
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
 * Upcoming Events Table
 *
 * @component
 */
function UpcomingTable({ upcomingEvents }) {
  const classes = useStyles();
  const [checkboxStates, setCheckboxStates] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleCheckboxChange = event => {
    setCheckboxStates({
      ...checkboxStates,
      [event.target.name]: event.target.checked,
    });
  };
  const insertError = useSelector(state => state.guest.guestError);
  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    setSuccessMsg(null);
    e.preventDefault();
    if (name === '' || email === '') {
      setError('Insert required details');
      return;
    }

    setError(null);

    const keys = Object.keys(checkboxStates);
    const selectedEvents = [];
    keys.forEach(key => {
      if (checkboxStates[key]) {
        selectedEvents.push(key);
      }
    });
    if (isEmpty(selectedEvents)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      const guestObject = {
        name,
        email,
        events: selectedEvents,
      };
      dispatch(insertGuest(guestObject));
      if (insertError === null) {
        setEmail('');
        setName('');
        setCheckboxStates({});
        setSuccessMsg('Successful');
      } else {
        setSuccessMsg(insertError);
      }
    }
  };

  const getSeverity = () => {
    if (successMsg === 'Successful') {
      return 'success';
    }
    return 'error';
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item md={8}>
        <Box m={4} />
        <Paper variant="outlined" align="center" className={classes.paperTable}>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Date and Time </b>
                  </TableCell>
                  <TableCell>
                    <b>Event</b>
                  </TableCell>
                  <TableCell>
                    <b>Conductor</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Interested?</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {upcomingEvents.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {`${new Date(
                        row.startingDateTime.seconds * 1000,
                      ).toDateString()} - ${new Date(
                        row.startingDateTime.seconds * 1000,
                      ).toLocaleTimeString()}`}
                    </TableCell>
                    <TableCell>
                      <b>{row.title}</b> &nbsp; {row.subTitle}
                    </TableCell>
                    <TableCell>{row.conductor}</TableCell>

                    <TableCell align="center">
                      <Checkbox
                        checked={
                          checkboxStates[row.id] === undefined
                            ? false
                            : checkboxStates[row.id]
                        }
                        onChange={handleCheckboxChange}
                        name={row.id}
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Box m={4} />
        <Paper variant="outlined" align="center" className={classes.paperForm}>
          <Typography variant="body1" gutterBottom align="center">
            Select the events and enter your details to receive an invite with
            the event link
          </Typography>

          <form className={classes.form} onSubmit={handleFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              fullWidth
              label="Name"
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
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              align="center"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          <br />
          <Card>
            {error != null ? (
              <Alert severity="error">
                <b>{error}</b>
              </Alert>
            ) : (
              <Card>
                {isDisabled ? (
                  <Alert severity="error">
                    <b>Please select an event</b>
                  </Alert>
                ) : (
                  <Card>
                    {successMsg != null ? (
                      <Alert severity={getSeverity()}>
                        <b>{successMsg}</b>
                      </Alert>
                    ) : (
                      <br />
                    )}
                  </Card>
                )}
              </Card>
            )}
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
}

UpcomingTable.propTypes = {
  upcomingEvents: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default UpcomingTable;
