import {
  Paper,
  Typography,
  Button,
  makeStyles,
  Card,
  CardContent,
  createMuiTheme,
  ThemeProvider,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { green, red } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import qaModerate from '../../../store/actions/qaActions';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '50%',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    letterSpacing: theme.spacing(0.2),
  },
  customCard: {
    width: '80%',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

/**
 * QA Form
 *
 * @component
 */
function QAForm({ question, handleModelClose }) {
  const classes = useStyles();

  const handleClick = status => () => {
    dispatch(qaModerate(question.id, status));
    handleModelClose();
  };

  const dispatch = useDispatch();
  return (
    <Paper
      variant="outlined"
      align="center"
      width="50%"
      className={classes.paper}
    >
      <Typography component="h2" variant="h6" gutterBottom align="center">
        {question.time} {question.name} {question.email}
      </Typography>
      <Card variant="outlined" className={classes.customCard}>
        <CardContent>
          <Typography
            component="h2"
            variant="subtitle1"
            gutterBottom
            align="center"
          >
            {question.question}
          </Typography>
        </CardContent>
      </Card>
      <br />
      <ThemeProvider theme={theme}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleClick(false)}
            >
              Decline
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleClick(true)}
            >
              Approve
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Paper>
  );
}

QAForm.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  handleModelClose: PropTypes.func.isRequired,
};
export default QAForm;
