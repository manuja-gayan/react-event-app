import { Box, makeStyles, MenuItem, Select } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import {
  UPCOMING_AND_LIVE_EVENTS,
  UPCOMING_EVENTS,
  LIVE_EVENTS,
  FINISHED_EVENTS,
  ALL_EVENTS,
} from './eventFilter';

const useStyles = makeStyles(theme => ({
  filter_span: {
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 1.25,
    fontSize: 16,
  },
}));

/**
 * Filter comp
 *
 * @component
 */
function FilterComponent({ filterField, onFilterChange }) {
  const classes = useStyles();
  return (
    <Box>
      <span className={classes.filter_span}>
        <FilterListIcon color="primary" />
        &nbsp; Filter &nbsp;&nbsp;
        <Select
          labelId="label"
          id="select"
          value={filterField}
          onChange={e => onFilterChange(e.target.value)}
        >
          <MenuItem value={UPCOMING_AND_LIVE_EVENTS}>
            {UPCOMING_AND_LIVE_EVENTS}
          </MenuItem>
          <MenuItem value={UPCOMING_EVENTS}>{UPCOMING_EVENTS}</MenuItem>
          <MenuItem value={LIVE_EVENTS}>{LIVE_EVENTS}</MenuItem>
          <MenuItem value={FINISHED_EVENTS}>{FINISHED_EVENTS}</MenuItem>
          <MenuItem value={ALL_EVENTS}>{ALL_EVENTS}</MenuItem>
        </Select>
      </span>
    </Box>
  );
}
FilterComponent.propTypes = {
  filterField: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
export default FilterComponent;
