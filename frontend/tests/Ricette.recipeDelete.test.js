import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import RecipeDelete from "../src/components/RecipeDelete";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    }
}

var contentFlick = true;
var programmedRecipe = "recipeID";

global.fetch = jest.fn().mockImplementation((url) =>
  (contentFlick ?
  Promise.resolve({
    json: () => {
        if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeID"))
          return Promise.resolve({value:programmedRecipe})
        if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeQuantity"))
          return Promise.resolve({value:"1"})
        if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment"))
          return Promise.resolve({value:"30"})
          if (url.startsWith(SETTINGS_ENDPOINT + "/"))
            return Promise.resolve({value:"boh"})
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
  }) : Promise.resolve({}))
)

describe('Ricette.jsx can correctly render page', () => {
    test('open recipe delete but connection error', async () => {
        contentFlick = false;
        await act(() => {render(<RecipeDelete recipeID="recipeID" onConfirm={() => {}}/>);});
        contentFlick = true;
    })
    
    test('open recipe delete', async () => {
        await act(() => {render(<RecipeDelete recipeID="recipeID" onConfirm={() => {}}/>);});
        expect(screen.getByText("Sei sicuro di voler rimuovere la ricetta?", {exact: false})).toBeInTheDocument();
    })
    
    test('open recipe delete and delete', async () => {
        await act(() => {render(<RecipeDelete recipeID="recipeID" onConfirm={() => {}}/>);});
        await act(() => {fireEvent.click(screen.getByText("Conferma"))});
    })

    test('open recipe delete and delete a recipe that is the programmed one', async () => {
        programmedRecipe = "recipeID";
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByLabelText("Elimina")[0])});
        await act(() => {fireEvent.click(screen.getByText("Conferma"))});
    })

    test('open recipe delete and delete a recipe that isnt the programmed one', async () => {
        programmedRecipe = "recipeID2";
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.click(screen.getAllByLabelText("Elimina")[0])});
        await act(() => {fireEvent.click(screen.getByText("Conferma"))});
    })
})
