import { screen, simpleRender } from '../../../test_util/testRender';
import AccountDisabled from '../AccountDisabled';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

test('render correctly', () => {
  simpleRender(<AccountDisabled />, {});
  expect(
    screen.queryByText(new RegExp('Your Account Has Been Disabled', 'i')),
  ).toBeInTheDocument();
});
