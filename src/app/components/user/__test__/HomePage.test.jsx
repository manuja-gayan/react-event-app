import { render, screen } from '../../../test_util/testRender';
import HomePage from '../homePage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('react-redux-firebase', () => ({
  ...jest.requireActual('react-redux-firebase'),
  useFirestoreConnect: jest.fn(),
}));

const el = <HomePage />;
test('render correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: {
      guest: {},
      firestore: {
        ordered: {
          events: [],
        },
      },
    },
  });
  expect(screen.getByRole(/heading/i, { name: /Events/i })).toBeInTheDocument();
  expect(
    screen.getByRole(/tab/i, { name: /Upcoming Events/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole(/tab/i, { name: /Current Events/i }),
  ).toBeInTheDocument();
});
