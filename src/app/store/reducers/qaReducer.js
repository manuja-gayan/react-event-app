import {
  QA_SUCCESS,
  QA_ERROR,
  NEW_QUESTION_SUCCESS,
  NEW_QUESTION_ERROR,
} from '../actionTypes.js/qaActionTypes';

const initialState = { qaError: null, newQuestionError: null };

const qaReducer = (state = initialState, action) => {
  switch (action.type) {
    case QA_SUCCESS:
      return {
        ...state,
        qaError: null,
      };
    case QA_ERROR:
      return {
        ...state,
        qaError: 'QA Moderation Failed',
      };
    case NEW_QUESTION_SUCCESS:
      return {
        ...state,
        newQuestionError: null,
      };
    case NEW_QUESTION_ERROR:
      return {
        ...state,
        newQuestionError:
          'OOPS, Some error occured while submitting your question. Try again later',
      };
    default:
      return state;
  }
};

export default qaReducer;
