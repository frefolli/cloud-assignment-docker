import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import reportWebVitals from '../src/reportWebVitals';
import { act } from "react-test-renderer";
import { SnackbarProvider } from 'notistack';
import { MemoryRouter} from "react-router-dom"
import { SETTINGS_ENDPOINT, SHOPPING_ENDPOINT } from '../src/utils/Protocol';

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
      if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment"))
        return Promise.resolve({value:"30"})
        if (url.startsWith(SETTINGS_ENDPOINT + "/"))
          return Promise.resolve({value:"default"})
      if (url.startsWith(SHOPPING_ENDPOINT + "/"))
        return Promise.resolve([]);
       return Promise.resolve({});
    },
  })
)

describe('App component', () => {
  test('should render correctly', async () => {
    let theContainer;
    await act(() => {
      const { container } = render(
        <MemoryRouter>
          <SnackbarProvider maxSnack={4}>
            <App />
          </SnackbarProvider>
        </MemoryRouter>
      );
      theContainer = container;
    })
    expect(theContainer.firstChild).toMatchSnapshot();
  })
});

describe('reportWebVitals', () => {
  test('should launch reportWebVitals', () => {
    reportWebVitals(() => true);
  });
});
