import { Box, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';

/**
 * Disabled user view
 *
 * @component
 */
function AccountDisabled() {
  const dispatch = useDispatch();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: window.innerHeight / 2 }}
    >
      <Alert severity="error">
        <b>
          Your Account Has Been Disabled, Please Contact Your System
          Administrator
        </b>
      </Alert>
      <Button
        align="center"
        color="secondary"
        variant="contained"
        onClick={() => {
          dispatch(logout());
        }}
        style={{ marginTop: '10px' }}
      >
        Logout
      </Button>
    </Box>
  );
}

export default AccountDisabled;
