import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Inventario from "../src/pages/Inventario";
import { act } from "react-test-renderer";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var ingredients = [
  { name: "ingredient1", quantity: 2.0, ingredientID: "ingredient1" },
  { name: "luppoli", quantity: 3.0, ingredientID: "luppoli" },
]

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
      if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
        return Promise.resolve({value:"30"})
      if (url.startsWith(SETTINGS_ENDPOINT))
        return Promise.resolve({value:"default"})
      return Promise.resolve(ingredients)
    }
  })
);

describe("Inventario component", () => {
  test("loads the inventory on mount", async () => {
    await act(() => render(<Inventario />));
    expect(screen.getByText("ingredient1")).toBeInTheDocument();
    expect(screen.getByText("luppoli")).toBeInTheDocument();
  });

  test("sets the default image if the requested image is not found", async () => {
    await act(() => render(<Inventario />));

    const img = await screen.findByAltText('ingredient1');
    expect(img.getAttribute('src')).toContain('ingredient1.png');

    await act(() => fireEvent.error(img));

    const _img = await screen.findByAltText('ingredient1');
    expect(_img.getAttribute('src')).toContain('sconosciuto.png');
  });

  test("deletes an item from the inventory and updates the state", async () => {
    await act(() => render(<Inventario />));
    await act(() => fireEvent.click(screen.getAllByLabelText("Elimina")[0]));
    await act(() => fireEvent.click(screen.getByText("Conferma")));
  });
});