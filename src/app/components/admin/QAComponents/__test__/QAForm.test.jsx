import { fireEvent, screen, render } from '../../../../test_util/testRender';
import QAForm from '../QAForm';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

test('render and btn clicks working correctly', () => {
  const mockFn = jest.fn();

  render(
    <QAForm
      handleModelClose={mockFn}
      question={{
        id: '123',
        time: 'eventTime',
        name: 'John',
        email: 'test@email.com',
        question: 'testQuestiion?',
        status: 'approved',
      }}
    />,
    {},
  );

  expect(screen.getByText(/John/i)).toBeInTheDocument();
  expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
  expect(screen.getByText(/testQuestiion?/i)).toBeInTheDocument();

  const btn1 = screen.getByRole(/button/i, { name: /Approve/i });
  expect(btn1).toBeInTheDocument();
  fireEvent.click(btn1);

  const btn2 = screen.getByRole(/button/i, { name: /Decline/i });
  expect(btn2).toBeInTheDocument();
  fireEvent.click(btn2);

  expect(mockFn).toBeCalledTimes(2);
});
