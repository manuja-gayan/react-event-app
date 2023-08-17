import { render, screen, waitFor } from '../../../test_util/testRender';
import Dashboard from '../Dashboard';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

const el = <Dashboard />;
test('render correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: {
      auth: {
        user: {},
      },
      firebase: { auth: { uid: '123' } },
    },
  });
  expect(
    screen.getByRole(/heading/i, { name: /dashboard/i }),
  ).toBeInTheDocument();
});

test('redirect to sign in correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: { auth: {}, firebase: { auth: {} } },
  });

  waitFor(() => expect(screen.getByText(/sign in/i)).not.toBeNull());
});

test('hide dashboard from disabled users correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: {
      auth: {
        user: { isDisabled: true },
      },
      firebase: { auth: { uid: '123' } },
    },
  });
  expect(screen.queryByRole(/heading/i, { name: /dashboard/i })).toBeNull();
});
