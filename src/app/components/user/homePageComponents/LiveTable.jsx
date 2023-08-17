import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  paperTable: {
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
  },
  tableContainer: {
    height: 600,
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
}));

/**
 * Live Events Table
 *
 * @component
 */
function LiveTable({ liveEvents }) {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
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
                {liveEvents.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{`${new Date(
                      row.startingDateTime.seconds * 1000,
                    ).toDateString()} - ${new Date(
                      row.startingDateTime.seconds * 1000,
                    ).toLocaleTimeString()}`}</TableCell>
                    <TableCell>
                      <b>{row.title}</b> &nbsp; {row.subTitle}
                    </TableCell>
                    <TableCell>{row.conductor}</TableCell>

                    <TableCell align="center">
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/event/${row.id}`}
                      >
                        <Button
                          type="button"
                          align="left"
                          variant="contained"
                          color="primary"
                        >
                          Join
                        </Button>
                      </Link>
                    </TableCell>
                    {/* {new Date(row.inTime.seconds * 1000).toLocaleTimeString()} */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

LiveTable.propTypes = {
  liveEvents: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default LiveTable;
