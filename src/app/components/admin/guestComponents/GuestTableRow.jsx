import {
  Button,
  Checkbox,
  makeStyles,
  TableCell,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGuest } from '../../../store/actions/adminGuestActions';
import DeleteConfirmation from '../DeleteConfirmation';

const useStyles = makeStyles(theme => ({
  customTable: {
    marginTop: theme.spacing(2),
    maxHeight: '70vh',
  },
  checkBox: {
    color: `${theme.palette.success.main}!important`,
  },
}));

/**
 * Guest table row
 *
 * @component
 */
function GuestTableRow({ row }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const openModel = () => {
    setIsOpen(true);
  };
  const closeModel = () => setIsOpen(false);

  const onDelete = () => {
    dispatch(deleteGuest(row.id));
    closeModel();
  };
  return (
    <TableRow>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell align="center">
        <Checkbox
          className={classes.checkBox}
          disabled
          checked={row.registeredInterest}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          className={classes.checkBox}
          disabled
          checked={row.attended}
        />
      </TableCell>
      <TableCell align="center">{row.inTime ?? 'N/A'}</TableCell>
      <TableCell align="center">{row.outTime ?? 'N/A'}</TableCell>
      <TableCell align="center">
        <Button color="secondary" variant="contained" onClick={openModel}>
          Delete
        </Button>
        <DeleteConfirmation
          isOpen={isOpen}
          onClose={closeModel}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
GuestTableRow.propTypes = {
  row: PropTypes.shape().isRequired,
};

export default GuestTableRow;
