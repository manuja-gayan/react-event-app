import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
    padding: theme.spacing(0, 2),
  },
}));

/**
 * User consent page
 *
 * @component
 */
function UserConsentPage({ onContinue, onCancel }) {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      className={classes.container}
    >
      <Typography variant="h5" color="primary" align="center">
        Welcome to
      </Typography>
      <Typography variant="h1" color="primary" align="center" gutterBottom>
        Event App
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        By clicking on continue, you agree to our terms and conditions.
      </Typography>
      <Box m={4} />
      <Button color="primary" variant="contained" onClick={onContinue}>
        Continue
      </Button>
      <Box m={2} />
      <Button color="default" variant="contained" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
}
UserConsentPage.propTypes = {
  onContinue: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserConsentPage;
