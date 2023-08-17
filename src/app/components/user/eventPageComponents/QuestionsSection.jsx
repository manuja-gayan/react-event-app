import {
  Box,
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import newQuestion from '../../../store/actions/userQuestionActions';

const useStyles = makeStyles(theme => ({
  questionPaper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  },
  button: {
    letterSpacing: theme.spacing(0.2),
  },
  prevQuestion: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: '10px',
    textAlign: 'left',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(0),
    },
  },
  prevQuestionsBox: {
    height: 220,
    overflow: 'hidden',
    background: theme.palette.grey[200],
  },
  previousQuestion: {
    fontSize: '16px',
    letterSpacing: theme.spacing(0.05),
  },
  previousQuestionTime: {
    fontSize: '12px',
    letterSpacing: theme.spacing(0.05),
    color: theme.palette.grey,
  },
  alert: {
    fontSize: '12px',
  },
}));

const getQuestionStatus = val => {
  switch (val) {
    case 'approved':
      return {
        type: 'success',
        message:
          'Thanks! Your question passed our moderation and hopefully we will have enough time to ask it in the QnA',
      };
    case 'declined':
      return {
        type: 'error',
        message: 'Sorry! Your question did not pass our moderation',
      };
    default:
      return {
        type: 'info',
        message: 'Thanks! Your question has been sent for moderation.',
      };
  }
};

/**
 * Question Section
 *
 *@component
 */
function QuestionsSection({ eventID, guestID, name, email }) {
  const classes = useStyles();
  const [questionBody, setQuestionBody] = useState('');
  const dispatch = useDispatch();
  const newQuestionError = useSelector(state => state.qa.newQuestionError);
  const handleQuestionFormSubmission = e => {
    e.preventDefault();
    dispatch(newQuestion(eventID, guestID, name, email, questionBody));
    setQuestionBody('');
  };
  useFirestoreConnect([
    {
      collection: 'questions',
      orderBy: ['time', 'desc'],
      storeAs: 'userQuestions',
    },
  ]);
  const questions = useSelector(state => state.firestore.ordered.userQuestions);
  const previousQuestionComponents = [];

  if (questions) {
    questions.forEach(question => {
      if (question.guest === guestID) {
        const questionStatus = getQuestionStatus(question.status);
        previousQuestionComponents.push(
          <Paper
            className={classes.prevQuestion}
            variant="outlined"
            elevation={0}
            key={questions.indexOf(question)}
          >
            <Typography className={classes.previousQuestionTime}>
              <AccessTimeIcon className={classes.previousQuestionTime} />{' '}
              {new Date(question.time).toLocaleTimeString()}
            </Typography>
            <Box m={0.5} />
            <Typography component="div" className={classes.previousQuestion}>
              {question.question}
            </Typography>
            <Box m={0.5} />
            <Alert severity={questionStatus.type} className={classes.alert}>
              {questionStatus.message}
            </Alert>
          </Paper>,
        );
      }
    });
  }
  return (
    <Paper variant="outlined" elevation={0} className={classes.questionPaper}>
      <Typography variant="h6">Questions ?</Typography>
      <Box m={1} />
      <Typography component="div">
        <b>My Previous Questions</b>
      </Typography>
      <Box m={0.5} />
      <Paper
        variant="outlined"
        elevation={0}
        className={classes.prevQuestionsBox}
      >
        <Box height="100%" overflow="auto" padding={1}>
          {previousQuestionComponents.length > 0 ? (
            previousQuestionComponents
          ) : (
            <Alert severity="info">
              You have no previous questions related to this event
            </Alert>
          )}
        </Box>
      </Paper>
      {newQuestionError !== null ? (
        <Alert severity="error">{newQuestionError}</Alert>
      ) : null}
      <form onSubmit={handleQuestionFormSubmission}>
        <TextField
          id="questionField"
          label="Ask a New Question"
          multiline
          rows="4"
          margin="normal"
          variant="outlined"
          fullWidth
          required
          value={questionBody}
          onChange={e => setQuestionBody(e.target.value)}
        />
        <Box m={1} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Ask Question
        </Button>
      </form>
    </Paper>
  );
}
QuestionsSection.propTypes = {
  eventID: PropTypes.string.isRequired,
  guestID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
export default QuestionsSection;
