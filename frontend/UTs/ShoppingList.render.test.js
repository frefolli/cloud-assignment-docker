import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingList from "../src/components/ShoppingList";
import { act } from "react-test-renderer";
import { SETTINGS_ENDPOINT, SHOPPING_ENDPOINT } from "../src/utils/Protocol";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    },
    "ricetta": {
        recipeID: "ricetta", name: "nome",
        description: "descrizione", ingredients: []
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url.startsWith(SETTINGS_ENDPOINT))
          return Promise.resolve({value:"default"})
        if (url.startsWith(SHOPPING_ENDPOINT))
          return Promise.resolve([]);
    },
  })
)

describe('ShoppingList.jsx can correctly render page', () => {
    test('load page', async () => {
        await act(() => {render(<ShoppingList recipeID={""}/>);});
    })
})