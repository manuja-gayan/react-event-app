import { Box, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
/**
 * circular indicator
 *
 * @component
 */
function CircularProgressIndicator({ boxHeight }) {
  return (
    <Box
      style={{ height: boxHeight || window.innerHeight }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
}
CircularProgressIndicator.propTypes = {
  boxHeight: PropTypes.number,
};
CircularProgressIndicator.defaultProps = {
  boxHeight: window.innerHeight,
};
export default CircularProgressIndicator;
