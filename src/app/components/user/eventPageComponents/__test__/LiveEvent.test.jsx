import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { Route } from 'react-router-dom';
import { screen, render } from '../../../../test_util/testRender';
import LiveEvent from '../LiveEvent';

const event = {
  title: faker.random.words(4),
  subTitle: faker.random.words(2),
  conductor: `${faker.name.firstName(0)} ${faker.name.lastName(0)}`,
  startingDateTime: { toDate: () => new Date() },
};

const email = faker.internet.email();
const name = `${faker.name.firstName(0)} ${faker.name.lastName(0)}`;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const setup = () => {
  render(
    <Route path="/event/:id">
      <LiveEvent event={event} />
    </Route>,
    { routes: ['/event/12345'] },
  );
};

test('Render event details', () => {
  setup();
  expect(screen.getByText(new RegExp(event.title, 'i'))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(event.subTitle, 'i'))).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(event.conductor, 'i')),
  ).toBeInTheDocument();
});

test('Submit Form', () => {
  setup();
  const emailInput = screen.getByLabelText(/Email Address/i);
  userEvent.type(emailInput, email);
  const nameInput = screen.getByLabelText(/Name/i);
  userEvent.type(nameInput, name);

  expect(emailInput.value).toBe(email);
  expect(nameInput.value).toBe(name);

  const btn = screen.getByRole('button');
  userEvent.click(btn);
});
