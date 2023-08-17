import { simpleRender, screen, fireEvent } from '../../../test_util/testRender';
import UserConsentPage from '../userConsentPage';

test('render correctly', () => {
  const mockCancel = jest.fn();
  const mockContinue = jest.fn();
  simpleRender(
    <UserConsentPage onCancel={mockCancel} onContinue={mockContinue} />,
  );
  expect(screen.getByText(new RegExp('Welcome', 'i'))).toBeInTheDocument();

  for (const el of screen.getAllByRole(/button/i)) {
    fireEvent.click(el);
  }
  expect(mockContinue).toBeCalledTimes(1);
  expect(mockCancel).toBeCalledTimes(1);
});
