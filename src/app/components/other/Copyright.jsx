import { Typography } from '@material-ui/core';

/**
 * Copyright
 *
 * @component
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © Event App {new Date().getFullYear()}.
    </Typography>
  );
}

export default Copyright;
