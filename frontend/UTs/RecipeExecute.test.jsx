import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import RecipeExecute from "../src/components/RecipeExecute";
import { act } from "react-test-renderer";
import { FAKE_NOTIFIER, BEERS_ENDPOINT, SHOPPING_ENDPOINT, RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    }
}

const theIngredient = {
                "name": "ingredientName", "quantity": "1",
                "recipeID": "recipeID", "ingredientID": "ingredientID"
            };

var flickContent = {
  equipment: true,
  recipe: true,
  beer: true
};

var flickStatus = {
  equipment: 200,
  recipe: 200,
  beer: 200
};

function getStatus(url) {
  if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment"))
    return flickStatus.equipment;
  if (url.startsWith(RECIPES_ENDPOINT + "/"))
    return flickStatus.recipe;
  if (url.startsWith(BEERS_ENDPOINT))
    return flickStatus.beer;
  return 200;
};

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment") && (!flickContent.equipment))
    return Promise.resolve({});
  if (url.startsWith(RECIPES_ENDPOINT + "/") && (!flickContent.recipe))
    return Promise.resolve({});
  if (url.startsWith(BEERS_ENDPOINT) && (!flickContent.beer))
    return Promise.resolve({});
  return Promise.resolve({
      status: getStatus(url),
      json: () => {
        if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment"))
          return Promise.resolve({value:"30"})
          if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeID"))
            return Promise.resolve({value:""})
          if (url.startsWith(SETTINGS_ENDPOINT + "/"))
            return Promise.resolve({value:"default"})
          if (url == RECIPES_ENDPOINT)
            return Promise.resolve(Object.keys(recipes));
          else {
              if (url.startsWith(RECIPES_ENDPOINT + "/")) {
                  let recipeID = url.replace(RECIPES_ENDPOINT + "/", "");
                  return Promise.resolve(recipes[recipeID]);
              } else if (url.startsWith(SHOPPING_ENDPOINT + "/")) {
                  let recipeID = url.replace(SHOPPING_ENDPOINT + "/", "");
                  return Promise.resolve(recipes[recipeID].ingredients);
              } else {
                  return Promise.resolve(null);
              }
          }
      },
    })
  }
)

describe('Ricette.jsx can correctly execute recipe', () => {
    test('open recipe execute but recipe request fail', async () => {
      flickContent.recipe = false;
      flickContent.equipment = true;
      await act(() => render(<RecipeExecute notifier={FAKE_NOTIFIER} recipeID="some"/>));
    })

    test('open recipe execute but equipment request fail', async () => {
      flickContent.recipe = false;
      flickContent.equipment = false;
      await act(() => render(<RecipeExecute recipeID="some"/>));
    })

    test('open recipe execute but equipment request fail', async () => {
      flickContent.recipe = true;
      flickContent.equipment = false;
      await act(() => render(<RecipeExecute recipeID="some"/>));
    })
})
