import {
  fireEvent,
  screen,
  simpleRender,
} from '../../../../test_util/testRender';
import showStatus from '../showStatusFunction';

test('render pending status correctly', () => {
  const mockFn = jest.fn();
  simpleRender(showStatus({ status: 'pending' }, mockFn));

  const btn = screen.getByLabelText(/edit/i);
  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(mockFn).toBeCalledTimes(1);
});

test('render approved status correctly', () => {
  simpleRender(showStatus({ status: 'approved' }, () => {}));

  expect(
    screen.getByRole(/button/i, {
      name: /approved/i,
    }),
  ).toBeInTheDocument();
});

test('render declined status correctly', () => {
  simpleRender(showStatus({ status: 'declined' }, () => {}));

  expect(
    screen.getByRole(/button/i, {
      name: /declined/i,
    }),
  ).toBeInTheDocument();
});
