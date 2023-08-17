import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GuestTableRow from './GuestTableRow';

const useStyles = makeStyles(theme => ({
  customTable: {
    marginTop: theme.spacing(2),
    maxHeight: '70vh',
  },
}));
/**
 * Guest Table
 *
 * @component
 */
function GuestTable({ filteredGuests }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.customTable}>
      <Table stickyHeader size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Guest Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Registered Interest?</TableCell>
            <TableCell align="center">Attended?</TableCell>
            <TableCell align="center">Webinar in time</TableCell>
            <TableCell align="center">Webinar out time</TableCell>
            <TableCell align="center">Edit/Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredGuests.map(row => (
            <GuestTableRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

GuestTable.propTypes = {
  filteredGuests: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default GuestTable;
