import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../src/App';
import { act } from "react-test-renderer";
import mediaQuery from "css-mediaquery";
import { SETTINGS_ENDPOINT, SHOPPING_ENDPOINT } from '../src/utils/Protocol';
import { SnackbarProvider } from 'notistack';
import { MemoryRouter} from "react-router-dom"


function createMatchMedia(width) {
  return (query) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
}

function resizeScreenSize(width) {
  window.matchMedia = createMatchMedia(width);
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
      if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
        return Promise.resolve({value:"30"})
        if (url.startsWith(SETTINGS_ENDPOINT))
          return Promise.resolve({value:"default"})
      if (url.startsWith(SHOPPING_ENDPOINT))
        return Promise.resolve([]);
      return Promise.resolve({});
    },
  })
)

describe('NavBar component', () => {
  test('should render correctly', async () => {
    resizeScreenSize(900);
    await act(() => {
      render(
        <MemoryRouter>
          <SnackbarProvider maxSnack={4}>
            <App />
          </SnackbarProvider>
        </MemoryRouter>
      );
    })
    await act(() => fireEvent.click(screen.getByLabelText("OpenNavMenu")));
    await act(() => fireEvent.click(screen.getAllByText("Impostazioni")[0]));
    await act(() => fireEvent.mouseDown(screen.getByLabelText("Color")));
    await act(() => fireEvent.click(screen.getAllByText("dark")[0]));
  })
});
