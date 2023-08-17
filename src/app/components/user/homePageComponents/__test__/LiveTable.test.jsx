import { render, screen } from '../../../../test_util/testRender';
import LiveTable from '../LiveTable';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

jest.mock('react-redux-firebase', () => ({
  ...jest.requireActual('react-redux-firebase'),
  useFirestoreConnect: jest.fn(),
}));

const el = (
  <LiveTable
    liveEvents={[
      {
        id: '123',
        title: 'event title',
        subTitle: 'event sub title',
        conductor: 'John Doe',
        link: 'https://vimeo.com/1213412421',
        startingDateTime: 123141222,
        endingDateTime: 121421512,
        isTimer: false,
        isLive: true,
        isEnd: false,
      },
    ]}
  />
);
test('render correctly', () => {
  render(el, {
    routes: ['/'],
  });
  expect(screen.getByText(/event title/i)).toBeInTheDocument();
  expect(screen.getByText(/event sub title/i)).toBeInTheDocument();
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByRole(/button/i, { name: /Join/i })).toBeInTheDocument();
});
