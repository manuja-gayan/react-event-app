import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
    flexGrow: 1,
  },
}));

/**
 * Error404 Page
 *
 * @component
 */
function Error404() {
  const classes = useStyles();

  return (
    <Paper variant="outlined" align="center" className={classes.paper}>
      <Typography
        component="h2"
        variant="h1"
        color="primary"
        gutterBottom
        align="center"
      >
        Error 404
      </Typography>
      <Typography
        component="h5"
        variant="h5"
        color="primary"
        gutterBottom
        align="center"
      >
        The page you are looking for is not found
      </Typography>
      <br />
      <Link style={{ textDecoration: 'none' }} to="/">
        <Button
          type="submit"
          align="center"
          variant="contained"
          color="primary"
        >
          <HomeIcon />
          &nbsp; Home
        </Button>
      </Link>
    </Paper>
  );
}

export default Error404;
