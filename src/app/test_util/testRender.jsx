/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const customRender = (ui, { routes, initialState, ...options }) => {
  const initialEntries = routes ?? ['/'];
  const reduxStore = configureStore()(initialState ?? {});
  const wrapper = ({ children }) => (
    <MemoryRouter initialEntries={initialEntries}>
      <Provider store={reduxStore}>{children}</Provider>
    </MemoryRouter>
  );
  return render(ui, { wrapper, ...options });
};

const simpleRender = ui => render(ui);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, simpleRender };
