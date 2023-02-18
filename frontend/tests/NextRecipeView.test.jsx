import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-test-renderer";
import NextRecipeView from "../src/components/NextRecipeView";
import { fireEvent, render, screen } from "@testing-library/react";
import { BEER_LIST_ENDPOINT, RECIPE_ENDPOINT, RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT, SETTING_LIST_ENDPOINT, SHOPPING_ENDPOINT } from "../src/utils/Protocol";

var settings = {
  nextRecipeQuantity: "30",
  nextRecipeID: "recipeID",
  equipment: "30"
}

var recipes = {
  "recipeID": {
    recipeID: "recipeID", name: "recipeName",
    description: "recipeDescription", ingredients: []
  }
}

var contentFlicks = {
  nextRecipeID: true,
  nextRecipeQuantity: true,
  equipment: true,
  recipe: true,
  beer: true,
  shopping: true
};

var statusFlicks = {
  nextRecipeID: 200,
  nextRecipeQuantity: 200,
  equipment: 200,
  recipe: 200,
  beer: 200,
  shopping: 200,
  settings: 200
};

function getStatus(url) {
  if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
  return statusFlicks.equipment;
  if (url.startsWith(SETTINGS_ENDPOINT + "nextRecipeID"))
  return statusFlicks.nextRecipeID;
  if (url.startsWith(SETTINGS_ENDPOINT + "nextRecipeQuantity"))
  return statusFlicks.nextRecipeQuantity;
  if (url.startsWith(RECIPE_ENDPOINT))
  return statusFlicks.recipe;
  if (url.startsWith(BEER_LIST_ENDPOINT))
  return statusFlicks.beer;
  if (url.startsWith(SETTING_LIST_ENDPOINT))
  return statusFlicks.settings;
  return 200;
};

global.fetch = jest.fn().mockImplementation((url, body) => {
  if (url.startsWith(SHOPPING_ENDPOINT) && (!contentFlicks.shopping))
  return Promise.resolve({status: getStatus(url)});
  if (url.startsWith(SETTINGS_ENDPOINT + "equipment") && (!contentFlicks.equipment))
  return Promise.resolve({status: getStatus(url)});
  if (url.startsWith(SETTINGS_ENDPOINT + "nextRecipeID") && (!contentFlicks.nextRecipeID))
  return Promise.resolve({status: getStatus(url)});
  if (url.startsWith(SETTINGS_ENDPOINT + "nextRecipeQuantity") && (!contentFlicks.nextRecipeQuantity))
  return Promise.resolve({status: getStatus(url)});
  if (url.startsWith(RECIPE_ENDPOINT) && (!contentFlicks.recipe))
  return Promise.resolve({status: getStatus(url)});
  if (url.startsWith(BEER_LIST_ENDPOINT) && (!contentFlicks.beer))
  return Promise.resolve({status: getStatus(url)});
  return Promise.resolve({
    status: getStatus(url),
    json: () => {
      if (url.startsWith(SETTINGS_ENDPOINT + "nextRecipeID"))
      return Promise.resolve({value:settings.nextRecipeID})
      if (url.startsWith(SETTINGS_ENDPOINT + "nextRecipeQuantity"))
      return Promise.resolve({value:settings.nextRecipeQuantity})
      if (url.startsWith(SETTINGS_ENDPOINT + "equipment"))
      return Promise.resolve({value:settings.equipment})
      if (url.startsWith(SETTINGS_ENDPOINT))
      return Promise.resolve({value:"default"})
      if (url === RECIPE_LIST_ENDPOINT)
      return Promise.resolve(Object.keys(recipes));
      else {
        if (url.startsWith(RECIPE_ENDPOINT)) {
          let recipeID = url.replace(RECIPE_ENDPOINT, "");
          return Promise.resolve(recipes[recipeID]);
        } else if (url.startsWith(SHOPPING_ENDPOINT)) {
          let recipeID = url.replace(SHOPPING_ENDPOINT, "");
          return Promise.resolve(recipes[recipeID].ingredients);
        } else {
          return Promise.resolve(null);
        }
      }
    },
  })
}
)

describe("NextRecipeView tests", () => {
  test("settings are not very ok 1", async () => {
    settings.nextRecipeID = "";
    await act(() => render(<NextRecipeView/>))
    settings.nextRecipeID = "recipeID";
  })
  
  test("settings are not very ok 2", async () => {
    settings.nextRecipeQuantity = "";
    await act(() => render(<NextRecipeView/>))
    settings.nextRecipeQuantity = "30";
  })

  test("settings are not very ok 4", async () => {
    settings.equipment = "";
    await act(() => render(<NextRecipeView/>))
    settings.equipment = "30";
  })
  
  test("settings are there", async () => {
    await act(() => render(<NextRecipeView/>))
  })
  
  test("settings there is not 1", async () => {
    contentFlicks.nextRecipeID = false;
    await act(() => render(<NextRecipeView/>))
    contentFlicks.nextRecipeID = true;
  })
  
  test("settings there is not 2", async () => {
    contentFlicks.nextRecipeQuantity = false;
    await act(() => render(<NextRecipeView/>))
    contentFlicks.nextRecipeQuantity = true;
  })
  
  test("settings there is not 1 but cannot post", async () => {
    contentFlicks.nextRecipeID = false;
    statusFlicks.nextRecipeID = 400;
    statusFlicks.settings = 400;
    await act(() => render(<NextRecipeView/>))
    statusFlicks.settings = 200;
    statusFlicks.nextRecipeID = 200;
    contentFlicks.nextRecipeID = true;
  })
  
  test("settings there is not 2 but cannot post", async () => {
    contentFlicks.nextRecipeQuantity = false;
    statusFlicks.nextRecipeQuantity = 400;
    statusFlicks.settings = 400;
    await act(() => render(<NextRecipeView/>))
    statusFlicks.settings = 200;
    statusFlicks.nextRecipeQuantity = 200;
    contentFlicks.nextRecipeQuantity = true;
  })
  
  test("settings there is not 3", async () => {
    contentFlicks.shopping = false;
    await act(() => render(<NextRecipeView/>))
    contentFlicks.shopping = true;
  })
  
  test("settings there is not 4", async () => {
    contentFlicks.equipment = false;
    await act(() => render(<NextRecipeView/>))
    contentFlicks.equipment = true;
  })

  
  test("adding a beer but name is invalid", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    await act(() => render(<NextRecipeView/>))
    await act(() => fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: ""}}));
    await act(() => fireEvent.click(screen.getAllByText("Crea")[0]));
  })

  test("adding a beer but quantity is too much", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    settings.nextRecipeQuantity = "90";
    await act(() => render(<NextRecipeView/>))
  })

  test("adding a beer but not enough ingreditents", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    settings.nextRecipeQuantity = "30";
    await act(() => render(<NextRecipeView/>))
    statusFlicks.beer = 400;
    await act(() => fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: "newBeerName"}}));
    await act(() => fireEvent.click(screen.getAllByText("Crea")[0]));
  })

  test("adding a beer", async () => {
    contentFlicks.nextRecipeID = true;
    contentFlicks.nextRecipeQuantity = true;
    contentFlicks.equipment = true;
    await act(() => render(<NextRecipeView/>))
    statusFlicks.beer = 200;
    await act(() => fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: "newBeerName"}}));
    await act(() => fireEvent.click(screen.getAllByText("Crea")[0]));
  })
})