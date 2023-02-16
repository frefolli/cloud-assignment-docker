import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { RECIPE_ENDPOINT, RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";

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
        if (url.startsWith("/api/recipes?name="))
          return Promise.resolve(Object.keys(recipes));
        if (url == RECIPE_LIST_ENDPOINT)
          return Promise.resolve(Object.keys(recipes));
        else {
            if (url.startsWith(RECIPE_ENDPOINT)) {
                let recipeID = url.replace(RECIPE_ENDPOINT, "");
                return Promise.resolve(recipes[recipeID]);
            } else {
                return Promise.resolve(null);
            }
        }
    },
  })
)

describe('Ricette.jsx can correctly render page', () => {
    test('load page', async () => {
        await act(() => {render(<Ricette/>);});
        expect(screen.getAllByText(recipes.recipeID.name, { exact: false })[0]).toBeInTheDocument();
        expect(screen.getByText(recipes.recipeID.description, { exact: false })).toBeInTheDocument();
        fireEvent.click(screen.getByText("Nome"));
        fireEvent.click(screen.getByText("Descrizione"));
    })
    
    test('can filter recipes', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => fireEvent.change(screen.getAllByRole("textbox")[0], {target: {value: "recipeName"}}));
        await act(() => fireEvent.click(screen.getAllByText("Filtra")[0]));
        await act(() => fireEvent.click(screen.getAllByText("Togli")[0]));
    })
    
    test('can program recipes', async () => {
        await act(() => {render(<Ricette/>);});
        fireEvent.mouseDown(screen.getByLabelText("Recipe"));
        fireEvent.mouseDown(within(screen.getByRole("listbox")).getByText("recipeName"));
    })
})