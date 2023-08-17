import { getTimeStr } from '../../../util/helpers';

const createData = q => ({
  id: q.id,
  time: getTimeStr(q.time),
  name: q.name,
  email: q.email,
  question: q.question,
  status: q.status,
});

/**
 * @param {string} eventId event ID
 * @param {Array} questions question list
 * @returns {Array} filteredQuestions
 */
function qaFilter(eventId, questions) {
  const filteredQuestions = [];
  if (eventId === 'all') {
    questions.forEach(question => {
      filteredQuestions.push(createData(question));
    });
  } else {
    questions.forEach(question => {
      if (question.event === eventId) {
        filteredQuestions.push(createData(question));
      }
    });
  }
  return filteredQuestions;
}

export default qaFilter;
