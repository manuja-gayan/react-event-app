import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import { isLoaded } from 'react-redux-firebase';
import FilterListIcon from '@material-ui/icons/FilterList';
import { getDateTimeStr } from '../../util/helpers';

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  filter_box: {
    display: 'flex',
    alignItems: 'center',
  },
  filter_span: {
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 1.25,
    fontSize: 16,
  },
}));

/**
 * Filter by Event component
 *
 * @component
 */
function FilterByEvent({ selectedEvent, handleChange, events }) {
  const classes = useStyles();

  const menuItems = [];
  const showEventMenuItems = () => {
    if (isLoaded(events)) {
      events.forEach(event => {
        const menuItem = (
          <MenuItem value={event.id} key={event.id}>
            <b>{event.title}</b>&nbsp;-&nbsp;
            {getDateTimeStr(event.startingDateTime.seconds * 1000)}
          </MenuItem>
        );
        menuItems.push(menuItem);
      });
    }
    return menuItems;
  };

  return (
    <Box paddingY={1}>
      <span className={classes.filter_span}>
        <FilterListIcon color="primary" />
        &nbsp; Filter by Event &nbsp;&nbsp;
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedEvent}
            onChange={handleChange}
          >
            <MenuItem value="all" key="all">
              <b>All</b>
            </MenuItem>
            {showEventMenuItems()}
          </Select>
        </FormControl>
      </span>
    </Box>
  );
}

FilterByEvent.propTypes = {
  selectedEvent: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default FilterByEvent;
