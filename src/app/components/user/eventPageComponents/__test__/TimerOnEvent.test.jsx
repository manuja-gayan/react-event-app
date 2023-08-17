import faker from 'faker';
import { screen, simpleRender } from '../../../../test_util/testRender';
import TimerOnEvent from '../TimerOnEvent';

const event = {
  title: faker.random.words(4),
  conductor: `${faker.name.firstName(0)} ${faker.name.lastName(0)}`,
  startingDateTime: { toDate: () => new Date() },
};
test('render correctly', () => {
  simpleRender(<TimerOnEvent event={event} />);
  expect(screen.getByText(new RegExp(event.title, 'i'))).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(event.conductor, 'i')),
  ).toBeInTheDocument();
});
