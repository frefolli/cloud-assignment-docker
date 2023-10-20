import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { FAKE_NOTIFIER, RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import RecipeEdit from "../src/components/RecipeEdit";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: [
            {
                "name": "ingredientName", "quantity": "1",
                "recipeID": "recipeID", "ingredientID": "ingredientID"
            },
            {
                "name": "ingredientName2", "quantity": "1",
                "recipeID": "recipeID", "ingredientID": "ingredientID2"
            }
        ]
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment"))
          return Promise.resolve({value:"30"})
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

const setupRecipeEdit = (notifier) => render(<RecipeEdit onConfirm={() => {}} recipeID="recipeID" notifier={notifier}/>);

describe('Ricette.jsx can correctly edit recipe', () => {
    test('open recipe edit from Ricette', async () => {
        await act(() => render(<Ricette/>));
        await act(() => {fireEvent.click(screen.getAllByLabelText("Modifica")[0])});
    })

    test('open recipe edit and set name and mocked notifier', async () => {
        await act(() => setupRecipeEdit(FAKE_NOTIFIER));
        await act(() => {fireEvent.change(screen.getAllByLabelText("Recipe Name")[0], {target: {value: "newName"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Aggiorna")[0])});
    })
    
    test('open recipe edit and set description', async () => {
        await act(() => setupRecipeEdit());
        await act(() => {fireEvent.change(screen.getAllByLabelText("Recipe Description")[0], {target: {value: "newDescription"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Aggiorna")[1])});
    })
    
    test('open recipe edit and update an ingredient', async () => {
        await act(() => setupRecipeEdit());
        await act(() => {fireEvent.change(screen.getAllByLabelText("Ingredient Quantity")[0], {target: {value: "1"}})});
        await act(() => {fireEvent.click(screen.getAllByLabelText("V")[0])});
    })
    
    test('open recipe edit and update an ingredient invalid', async () => {
        await act(() => setupRecipeEdit());
        await act(() => {fireEvent.change(screen.getAllByLabelText("Ingredient Quantity")[0], {target: {value: "0"}})});
        await act(() => {fireEvent.click(screen.getAllByLabelText("V")[0])});
    })

    test('open recipe edit and delete an ingredient', async () => {
        await act(() => setupRecipeEdit());
        await act(() => {fireEvent.click(screen.getAllByLabelText("X")[0])});
    })
})
