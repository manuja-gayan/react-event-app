import { render, screen } from '../../../../test_util/testRender';
import Staff from '../Staff';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('react-redux-firebase', () => ({
  ...jest.requireActual('react-redux-firebase'),
  useFirestoreConnect: jest.fn(),
}));

const el = <Staff />;
test('render correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: {
      auth: {},
      firebase: { auth: {} },
      firestore: {
        ordered: {
          staff: [
            {
              id: '123',
              name: 'John Doe',
              email: 'john@email.com',
              eventAccess: true,
              staffAccess: true,
              questionAccess: false,
              guestAccess: false,
              isDisabled: false,
            },
          ],
          events: [],
        },
      },
    },
  });
  expect(screen.getByRole(/heading/i, { name: /Staff/i })).toBeInTheDocument();
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/john@email.com/i)).toBeInTheDocument();
  const checkboxs = screen.getAllByRole(/checkbox/i);
  expect(checkboxs[0]).toBeChecked();
  expect(checkboxs[1]).toBeChecked();
  expect(checkboxs[2]).not.toBeChecked();
  expect(checkboxs[3]).not.toBeChecked();
});

test('display delete error correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: {
      auth: { deleteError: 'delete error' },
      firebase: { auth: {} },
      firestore: {
        ordered: {
          staff: [
            {
              id: '123',
              name: 'John Doe',
              email: 'john@email.com',
              eventAccess: true,
              staffAccess: true,
              questionAccess: false,
              guestAccess: false,
              isDisabled: false,
            },
          ],
          events: [],
        },
      },
    },
  });
  expect(screen.getByText(/delete error/i)).toBeInTheDocument();
});
