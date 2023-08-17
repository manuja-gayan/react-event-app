import { Box, makeStyles, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    flexGrow: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(4),
      padding: theme.spacing(4),
    },
  },
}));

/**
 * Base page container
 *
 * @component
 */
function PageContainer({ children, className }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper
        variant="outlined"
        align="center"
        className={`${classes.paper} ${className}`}
      >
        {children}
      </Paper>
    </Box>
  );
}
PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  className: PropTypes.string,
};
PageContainer.defaultProps = {
  className: '',
};
export default PageContainer;
