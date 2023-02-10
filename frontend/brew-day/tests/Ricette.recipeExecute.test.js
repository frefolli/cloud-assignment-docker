import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    },
    "recipeID2": {
        recipeID: "recipeID2", name: "recipeName2",
        description: "recipeDescription2", ingredients: [
            {
                "name": "malto", "quantity": "1",
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
        if (url == "/api/recipes")
          return Promise.resolve(Object.keys(recipes));
        else if (url.startsWith("/api/recipes/")) {
            let recipeID = url.replace("/api/recipes/", "");
            return Promise.resolve(recipes[recipeID]);
        } else if (url.startsWith("/api/shopping/")) {
            let recipeID = url.replace("/api/shopping/", "");
            return Promise.resolve(recipes[recipeID].ingredients);
        } else {
            return Promise.resolve(null);
        }
    },
  })
)

describe('Ricette.jsx can correctly execute recipe', () => {
    test('open recipe execute and see shopping list', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Esegui")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open recipe execute but dont create beer', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Esegui")[1])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('open recipe execute and create beer', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Esegui")[0])});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "newBeerName"}})});
        await act(() => {fireEvent.change(screen.getAllByRole("textbox")[1], {target: {value: "0"}})});
        await act(() => {fireEvent.click(screen.getAllByText("Crea")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
})