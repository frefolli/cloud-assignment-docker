import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import RecipeEdit from "../src/components/RecipeEdit";

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

global.fetch = jest.fn().mockImplementation((url) =>
Promise.resolve({
  json: () => {
    if (url.startsWith(SETTINGS_ENDPOINT + "/"))
      return Promise.resolve({value:"default"})
    if (url === RECIPES_ENDPOINT)
      return Promise.resolve(Object.keys(recipes));
    else {
      if (url.startsWith(RECIPES_ENDPOINT + "/")) {
        let recipeID = url.replace(RECIPES_ENDPOINT + "/", "");
        return Promise.resolve(recipes[recipeID]);
      } else {
        return Promise.resolve(null);
      }
    }
  },
})
)

const setupRecipeEdit = () => render(<RecipeEdit onConfirm={() => {}} recipeID="recipeID"/>);

describe('Ricette.jsx can correctly edit recipe', () => {
  test('open recipe edit and add an ingredient', async () => {
    await act(() => setupRecipeEdit());
    await act(() => {fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: {value: "newIngredientName"}})});
    await act(() => {fireEvent.change(screen.getAllByLabelText("Ingredient Quantity")[0], {target: {value: "12"}})});
    await act(() => {fireEvent.click(screen.getAllByLabelText("Aggiungi")[0])});
  })
  
  test("open recipe edit and rename recipe with invalid name", async () => {
    await act(() => setupRecipeEdit());
    await act(() => {fireEvent.change(screen.getAllByLabelText("Recipe Name")[0], {target: {value: ""}})});
    await act(() => {fireEvent.click(screen.getAllByText("Aggiorna")[0])});
  })
  
  test('open recipe edit and attempt add an ingredient with invalid name and valid quantity', async () => {
    await act(() => setupRecipeEdit());
    await act(() => {fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: {value: ""}})});
    await act(() => {fireEvent.change(screen.getAllByLabelText("Ingredient Quantity")[0], {target: {value: "12"}})});
    await act(() => {fireEvent.click(screen.getAllByLabelText("Aggiungi")[0])});
  })
  
  test('open recipe edit and attempt add an ingredient with valid name and valid quantity', async () => {
    await act(() => setupRecipeEdit());
    await act(() => {fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: {value: "boh"}})});
    await act(() => {fireEvent.change(screen.getAllByLabelText("Ingredient Quantity")[0], {target: {value: "12"}})});
    await act(() => {fireEvent.click(screen.getAllByLabelText("Aggiungi")[0])});
  })
  
  test('open recipe edit and attempt add an ingredient with invalid name and invalid quantity', async () => {
    await act(() => setupRecipeEdit());
    await act(() => {fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: {value: ""}})});
    await act(() => {fireEvent.change(screen.getAllByLabelText("Ingredient Quantity")[0], {target: {value: "0"}})});
    await act(() => {fireEvent.click(screen.getAllByLabelText("Aggiungi")[0])});
  })
  
  test('open recipe edit and attempt add an ingredient with valid name and invalid quantity', async () => {
    await act(() => setupRecipeEdit());
    await act(() => {fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: {value: "boh"}})});
    await act(() => {fireEvent.change(screen.getAllByLabelText("Ingredient Quantity")[0], {target: {value: "0"}})});
    await act(() => {fireEvent.click(screen.getAllByLabelText("Aggiungi")[0])});
  })
  
  test('open recipe edit and attempt add an ingredient with valid but already present name', async () => {
    recipes.recipeID.ingredients.push(theIngredient);
    await act(() => setupRecipeEdit());
    await act(() => {fireEvent.change(screen.getByLabelText("Ingredient Name"), {target: {value: "ingredientName"}})});
    await act(() => {fireEvent.change(screen.getAllByLabelText("Ingredient Quantity")[1], {target: {value: "12"}})});
    await act(() => {fireEvent.click(screen.getAllByLabelText("Aggiungi")[0])});
  })
})
