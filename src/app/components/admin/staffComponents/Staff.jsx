import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  ButtonGroup,
  makeStyles,
  Modal,
  Box,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import {
  toggleDisableStaff,
  resetAuthError,
} from '../../../store/actions/authActions';
import CircularProgressIndicator from '../../other/circularProgressIndicator';
import EditStaff from './editStaff';
import NewStaff from './newStaff';

const useStyles = makeStyles(theme => ({
  add_staff_button: {
    margin: theme.spacing(1, 0, 1),
    letterSpacing: theme.spacing(0.2),
  },
  modal_div: {
    width: '50%',
    alignItems: 'center',
  },
  alert: {
    width: '50%',
  },
  tableContainer: {
    maxHeight: '70vh',
  },
}));

/**
 * Staff page
 *
 * @component
 */
function Staff() {
  const classes = useStyles();
  const [addStaffModelState, setAddStaffModelState] = useState(false);
  const [editStaffModelState, setEditStaffModelState] = useState(false);
  const [editUser, setEditUser] = useState('');
  const [successMessage, setSuccessMessage] = useState();

  useFirestoreConnect([{ collection: 'staff', orderBy: ['name'], limit: 100 }]);
  const staffMembers = useSelector(state => state.firestore.ordered.staff);
  const auth = useSelector(state => state.firebase.auth);
  const derror = useSelector(state => state.auth.deleteError);
  const rerror = useSelector(state => state.auth.authError);

  const dispatch = useDispatch();

  const handleAddStaffModelOpen = () => {
    setAddStaffModelState(true);
  };

  const handleAddStaffModelClose = () => {
    setAddStaffModelState(false);
    dispatch(resetAuthError());
  };

  const handleEditStaffModelClose = () => {
    setEditStaffModelState(false);
  };

  const handleEditStaffOpen = data => {
    setEditStaffModelState(true);
    setEditUser(data);
  };

  const toggleDisableEntry = (id, val) => {
    dispatch(toggleDisableStaff(id, val));
  };
  const createData = (
    id,
    name,
    email,
    eventAccess,
    staffAccess,
    qaAccess,
    guestAccess,
    isDisabled,
  ) => ({
    id,
    name,
    email,
    eventAccess,
    staffAccess,
    qaAccess,
    guestAccess,
    isDisabled,
  });

  if (!isLoaded(staffMembers)) {
    return <CircularProgressIndicator boxHeight={window.innerHeight / 2} />;
  }

  const staff = [];

  if (isLoaded(staffMembers)) {
    staffMembers.forEach(member => {
      staff.push(
        createData(
          member.id,
          member.name,
          member.email,
          member.eventAccess,
          member.staffAccess,
          member.questionAccess,
          member.guestAccess,
          member.isDisabled,
        ),
      );
    });
  }

  if (isEmpty(staffMembers)) {
    return <div>Staff List Is Empty</div>;
  }

  return (
    <div>
      <Typography
        component="h2"
        variant="h5"
        color="primary"
        gutterBottom
        align="center"
      >
        Staff
      </Typography>
      {successMessage ? (
        <Alert
          severity="success"
          className={classes.alert}
          onClose={() => {
            setSuccessMessage('');
          }}
        >
          {successMessage}
        </Alert>
      ) : null}
      <Box align="right">
        <Button
          align="right"
          variant="contained"
          color="primary"
          onClick={handleAddStaffModelOpen}
          className={classes.add_staff_button}
        >
          Add New
        </Button>
      </Box>
      {/* this model is for the add  staff */}
      <Modal
        open={addStaffModelState}
        aria-labelledby="add-staff--modal-title"
        aria-describedby="add-staff-modal-description"
        align="center"
      >
        <div className={classes.modal_div}>
          <NewStaff handleAddStaffModelClose={handleAddStaffModelClose} />
        </div>
      </Modal>
      {/* this model is for the dit staff */}
      {editUser && (
        <Modal
          open={editStaffModelState}
          aria-labelledby="edit-staff-model"
          aria-describedby="edit-staff-model-description"
          align="center"
        >
          <div className={classes.modal_div}>
            <EditStaff
              id={editUser.id}
              name={editUser.name}
              eventAccess={editUser.eventAccess}
              staffAccess={editUser.staffAccess}
              questionAccess={editUser.qaAccess}
              guestAccess={editUser.guestAccess}
              handleEditStaffModelClose={handleEditStaffModelClose}
            />
          </div>
        </Modal>
      )}
      <Paper>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Staff Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Event Access</TableCell>
                <TableCell align="center">Staff Access</TableCell>
                <TableCell align="center">Q&A Access</TableCell>
                <TableCell align="center">Guest Access</TableCell>
                <TableCell align="center">Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staff.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      style={{
                        color: green[600],
                      }}
                      disabled
                      checked={row.eventAccess}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      style={{
                        color: green[600],
                      }}
                      disabled
                      checked={row.staffAccess}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      style={{
                        color: green[600],
                      }}
                      disabled
                      checked={row.qaAccess}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      style={{
                        color: green[600],
                      }}
                      disabled
                      checked={row.guestAccess}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          toggleDisableEntry(row.id, !row.isDisabled);
                        }}
                        disabled={auth.uid === row.id}
                      >
                        {row.isDisabled ? 'Activate' : 'Deactivate'}
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={auth.uid === row.id || row.isDisabled}
                        onClick={() => handleEditStaffOpen(row)}
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {derror && <p>{derror}</p>}
      {rerror && <p>{rerror}</p>}
    </div>
  );
}

export default Staff;
