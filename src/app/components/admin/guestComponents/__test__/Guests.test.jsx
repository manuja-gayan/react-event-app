import { render, screen } from '../../../../test_util/testRender';
import Guests from '../Guests';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('react-redux-firebase', () => ({
  ...jest.requireActual('react-redux-firebase'),
  useFirestoreConnect: jest.fn(),
}));

const el = <Guests />;
test('render correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: {
      firestore: {
        ordered: {
          guests: [
            {
              id: '123',
              name: 'John',
              email: 'test@email.com',
              registeredInterest: true,
              attended: false,
              inOut: [],
            },
          ],
          events: [],
        },
      },
    },
  });
  expect(screen.getByRole(/heading/i, { name: /Guests/i })).toBeInTheDocument();
  expect(screen.getByText(/John/i)).toBeInTheDocument();
  expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
  const checkboxs = screen.getAllByRole(/checkbox/i);
  expect(checkboxs[0]).toBeChecked();
  expect(checkboxs[1]).not.toBeChecked();
});

test('render empty list correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: {
      firestore: {
        ordered: {
          guests: [],
          events: [],
        },
      },
    },
  });
  expect(screen.getByText(/Guest List Is Empty/i)).toBeInTheDocument();
});
