import faker from 'faker';
import { EventAvailable as EventIcon } from '@material-ui/icons';
import { render, screen } from '../../../test_util/testRender';
import Navbar from '../Navbar';

const name = faker.name.firstName();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

const navbar = (
  <Navbar
    items={[{ title: 'Events', icon: <EventIcon /> }]}
    onListItemClick={() => {}}
  />
);
test('render correctly', () => {
  render(navbar, {
    routes: ['/'],
    initialState: { auth: {}, firebase: { auth: {} } },
  });
  expect(
    screen.getByRole(/heading/i, { name: /dashboard/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Events/i)).not.toBeNull();
});

test('user name displayed correctly', () => {
  render(navbar, {
    routes: ['/'],
    initialState: { auth: { user: { name } }, firebase: { auth: {} } },
  });

  expect(screen.getByText(new RegExp(name, 'i'))).not.toBeNull();
});

test('show auth actions when authoried', () => {
  render(navbar, {
    routes: ['/'],
    initialState: { auth: {}, firebase: { auth: { uid: '123' } } },
  });
  expect(screen.getByText(/Change Password/i)).not.toBeNull();
});
