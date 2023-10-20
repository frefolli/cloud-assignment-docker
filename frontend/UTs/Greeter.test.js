import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, act } from "@testing-library/react";
import Greeter from "../src/components/Greeter";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var contentFlick = true;
var name = "Francesco";

global.fetch = jest.fn().mockImplementation((url) =>
  (contentFlick ? Promise.resolve({
    json: () => {
      if (url.startsWith(SETTINGS_ENDPOINT + "name"))
          return Promise.resolve({value:name})
    }
  }) : Promise.resolve({}))
);

describe("Greeter component", () => {
  test("If name is null", async () => {
    contentFlick = false;
    await act(() => render(<Greeter />));
    contentFlick = true;
  });

  test("If advice isnt null", async () => {
    await act(() => render(<Greeter />));
  });
});