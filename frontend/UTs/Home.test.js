import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import Home from "../src/pages/Home";
import { RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import AdviceView from "../src/components/AdviceView";

var contentFlick = true;
var adviceQuantity = 30.0;

global.fetch = jest.fn().mockImplementation((url) =>
  (contentFlick ? Promise.resolve({
    json: () => {
      if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment"))
          return Promise.resolve({value:"30"})
      if (url === "/api/settings/nextRecipeID")
        return Promise.resolve({ value: "recipe1" });
      if (url.startsWith(SETTINGS_ENDPOINT + "/"))
        return Promise.resolve({value:"default"})
      if (url === "/api/advice") {
        return Promise.resolve({
          recipeID: "recipe1",
          quantity: adviceQuantity,
        });
      } else if (url == "/api/recipes/recipe1") {
        return Promise.resolve({
          recipeID: "recipe1",
          name: "ricetta luppoli",
          description: "test",
          ingredients: [
            {
              ingredientID: "ingredient1",
              name: "luppoli",
              quantity: 3.0,
              recipeID: "recipe1",
            },
          ],
        });
      }
      return Promise.resolve([]);
    }
  }) : Promise.resolve({}))
);

describe("Home component", () => {
  test("If response is not null, show recipe to execute and execute it", async () => {
    await act(() => render(<Home />));
    expect(screen.getAllByText("Crea")[0]).toBeInTheDocument();
    await act(() => fireEvent.click(screen.getAllByText("Crea")[0]));
  });

  test("If advice is null, dont show", async () => {
    contentFlick = false;
    await act(() => render(<AdviceView testAdviceCookie/>));
    contentFlick = true;
  });

  test("If advice is null (invalid adviceQuantity), dont show", async () => {
    adviceQuantity = -1;
    await act(() => render(<AdviceView />));
  });
});
