import { IconButton, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FileCopyOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    marginTop: 0,
    marginLeft: theme.spacing(1),
  },
}));

/**
 * Copy to clipboard button
 *
 * @component
 */
function CopyToClipboard({ text }) {
  const classes = useStyles();

  const onClick = () => navigator.clipboard.writeText(text);
  return (
    <IconButton
      size="small"
      color="primary"
      aria-label="copy"
      onClick={onClick}
      className={classes.iconBtn}
    >
      <FileCopyOutlined />
    </IconButton>
  );
}
CopyToClipboard.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyToClipboard;
