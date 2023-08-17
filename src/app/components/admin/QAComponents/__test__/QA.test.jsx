import { render, screen } from '../../../../test_util/testRender';
import QA from '../QA';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('react-redux-firebase', () => ({
  ...jest.requireActual('react-redux-firebase'),
  useFirestoreConnect: jest.fn(),
}));

const el = <QA />;
test('render correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: {
      firestore: {
        ordered: {
          questions: [
            {
              id: '123',
              time: 'eventTime',
              name: 'John',
              email: 'test@email.com',
              question: 'testQuestiion?',
              status: 'approved',
            },
          ],
          events: [],
        },
      },
    },
  });
  expect(
    screen.getByRole(/heading/i, { name: /Question Moderation/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/John/i)).toBeInTheDocument();
  expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
  expect(screen.getByText(/testQuestiion?/i)).toBeInTheDocument();
  expect(screen.getByText(/approved/i)).toBeInTheDocument();
});

test('render empty list correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: {
      firestore: {
        ordered: {
          questions: [],
          events: [],
        },
      },
    },
  });
  expect(screen.getByText(/Question List Is Empty/i)).toBeInTheDocument();
});
