import userEvent from '@testing-library/user-event';
import faker from 'faker';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test_util/testRender';
import SignIn from '../SignIn';

const email = faker.internet.email();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

test('render correctly', () => {
  render(<SignIn />, {
    routes: ['/'],
    initialState: { auth: { authError: '' }, firebase: { auth: {} } },
  });
  expect(
    screen.getByRole(/heading/i, { name: /sign in/i }),
  ).toBeInTheDocument();
});

test('textfields working correctly', () => {
  render(<SignIn />, {
    routes: ['/'],
    initialState: { auth: {}, firebase: { auth: { authError: '' } } },
  });
  const emailInput = screen.getByLabelText(/email address/i);
  userEvent.type(emailInput, email);
  const passInput = screen.getByLabelText(/password/i);
  userEvent.type(passInput, '123');

  expect(emailInput.value).toBe(email);
  expect(passInput.value).toBe('123');
});

test('auth error displayed correctly', () => {
  render(<SignIn />, {
    routes: ['/'],
    initialState: { auth: { authError: 'AuthErr' }, firebase: { auth: {} } },
  });

  expect(screen.getByText(/autherr/i)).not.toBeNull();
});

test('redirected on sign in correctly', () => {
  render(<SignIn />, {
    routes: ['/'],
    initialState: { auth: {}, firebase: { auth: { id: '123' } } },
  });
  fireEvent.click(screen.getByRole(/button/i));
  waitFor(() =>
    expect(
      screen.getByRole(/heading/i, { name: /sign in/i }),
    ).not.toBeInTheDocument(),
  );
});
