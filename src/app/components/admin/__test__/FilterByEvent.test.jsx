import faker from 'faker';
import { render, screen } from '../../../test_util/testRender';
import FilterByEvent from '../FilterByEvent';

const title1 = faker.music.genre();
const eventID1 = faker.git.commitSha();
const title2 = faker.music.genre();
const eventID2 = faker.git.commitSha();

const el = (
  <FilterByEvent
    selectedEvent={eventID1}
    events={[
      {
        id: eventID1,
        title: title1,
        startingDateTime: { seconds: 12173141231 },
      },
      {
        id: eventID2,
        title: title2,
        startingDateTime: { seconds: 12173141231 },
      },
    ]}
    handleChange={() => {}}
  />
);
test('render correctly', () => {
  render(el, {
    routes: ['/'],
    initialState: { auth: {}, firebase: { auth: {} } },
  });
  expect(screen.getByText(/Filter by Event/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(title1, 'i'))).toBeVisible();
  expect(screen.queryByText(new RegExp(title2, 'i'))).toBeNull();
});
