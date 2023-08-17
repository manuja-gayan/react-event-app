import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { render, screen } from '../../../../test_util/testRender';
import UpcomingTable from '../UpcomingTable';

const email = faker.internet.email();
const name = faker.name.firstName();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('react-redux-firebase', () => ({
  ...jest.requireActual('react-redux-firebase'),
  useFirestoreConnect: jest.fn(),
}));

const el = (
  <UpcomingTable
    upcomingEvents={[
      {
        id: '123',
        title: 'event title',
        subTitle: 'event sub title',
        conductor: 'John Doe',
        link: 'https://vimeo.com/1213412421',
        startingDateTime: 123141222,
        endingDateTime: 121421512,
        isTimer: false,
        isLive: false,
        isEnd: false,
      },
    ]}
  />
);
test('render and textboxes working correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: { guest: {} },
  });
  expect(screen.getByText(/event title/i)).toBeInTheDocument();
  expect(screen.getByText(/event sub title/i)).toBeInTheDocument();
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByRole(/button/i, { name: /Submit/i })).toBeInTheDocument();

  const nameInput = screen.getByRole(/textbox/i, { name: /Name/i });
  const emailInput = screen.getByRole(/textbox/i, { name: /Email/i });
  userEvent.type(emailInput, email);
  userEvent.type(nameInput, name);

  expect(emailInput.value).toBe(email);
  expect(nameInput.value).toBe(name);
});
