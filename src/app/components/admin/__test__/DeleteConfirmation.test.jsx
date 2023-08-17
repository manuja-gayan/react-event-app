import { simpleRender, screen, fireEvent } from '../../../test_util/testRender';
import DeleteConfirmation from '../DeleteConfirmation';

test('reder on isOpen is false', () => {
  const mockClose = jest.fn();
  const mockDelete = jest.fn();
  simpleRender(
    <DeleteConfirmation
      isOpen={false}
      onClose={mockClose}
      onDelete={mockDelete}
    />,
  );
  expect(screen.queryByText(new RegExp('Are you sure?', 'i'))).toBeNull();
});

test('render correctly and onClick funtions', () => {
  const mockClose = jest.fn();
  const mockDelete = jest.fn();
  simpleRender(
    <DeleteConfirmation isOpen onClose={mockClose} onDelete={mockDelete} />,
  );
  expect(
    screen.getByText(new RegExp('Are you sure?', 'i')),
  ).toBeInTheDocument();

  for (const el of screen.getAllByRole(/button/i)) {
    fireEvent.click(el);
  }
  expect(mockDelete).toBeCalledTimes(1);
  expect(mockClose).toBeCalledTimes(1);
});
