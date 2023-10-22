import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import RecipeView from "../src/components/RecipeView";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: [
            {
                "recipeID": "recipeID", "ingredientID": "ingredientID",
                "name": "malto", "quantity": "0"
            },
            {
                "recipeID": "recipeID", "ingredientID": "ingredientID2",
                "name": "ingsoc", "quantity": "0"
            }
        ]
    }
}

var contentFlick = true;

global.fetch = jest.fn().mockImplementation((url) =>
  (contentFlick ? Promise.resolve({
    json: () => {
        if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeID"))
          return Promise.resolve({value:""})
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
  }) : Promise.resolve({}))
)

describe('Ricette.jsx can correctly render page', () => {
    test('open and close recipe view', async () => {
        await act(() => render(<Ricette/>));
        await act(() => fireEvent.click(screen.getAllByLabelText("Dettagli")[0]));
    })

    test('open recipe view but connection error occur', async () => {
        contentFlick = false;
        await act(() => render(<RecipeView recipeID="recipeID" />));
        contentFlick = true;
    })

    test('open recipe view but ingredient image error occur', async () => {
        await act(() => render(<RecipeView recipeID="recipeID" />));
        await act(() => fireEvent.error(screen.getByAltText('ingsoc')));
    })

    test('open and close recipe view', async () => {
        await act(() => render(<RecipeView recipeID="recipeID" />));
        expect(screen.getAllByText(recipes.recipeID.name)[0]).toBeInTheDocument();
        expect(screen.getAllByText(recipes.recipeID.description)[0]).toBeInTheDocument();
        recipes.recipeID.ingredients.forEach((ing) => expect(screen.getAllByText(ing.name)[0]).toBeInTheDocument());
    })
})
