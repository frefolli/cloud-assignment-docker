import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { FAKE_NOTIFIER, RECIPES_ENDPOINT, SETTINGS_ENDPOINT, SHOPPING_ENDPOINT } from "../src/utils/Protocol";
import RecipeExecute from "../src/components/RecipeExecute";

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
                "recipeID": "recipeID2", "ingredientID": "ingredientID"
            },
            {
                "name": "ingredientName2", "quantity": "1",
                "recipeID": "recipeID2", "ingredientID": "ingredientID2"
            }
        ]
    }
}

var statusFlick = true;
var equipmentFlick = true;

function getStatus(url) {
    if (url.startsWith("/api/beers") && (!statusFlick)) {
        return 400;
    } else {
        return 200;
    }
}

global.fetch = jest.fn().mockImplementation((url) => {
    return Promise.resolve({
        status: getStatus(url),
        json: () => {
            if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment"))
              return Promise.resolve({value:(equipmentFlick ? "30" : "")})
              if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeID"))
                return Promise.resolve({value:""})
              if (url.startsWith(SETTINGS_ENDPOINT + "/"))
                return Promise.resolve({value:"default"})
            if (url === RECIPES_ENDPOINT)
              return Promise.resolve(Object.keys(recipes));
            else if (url.startsWith(RECIPES_ENDPOINT + "/")) {
                let recipeID = url.replace(RECIPES_ENDPOINT + "/", "");
                return Promise.resolve(recipes[recipeID]);
            } else if (url.startsWith(SHOPPING_ENDPOINT + "/")) {
                let recipeID = url.replace(SHOPPING_ENDPOINT + "/", "");
                return Promise.resolve(recipes[recipeID].ingredients);
            } else {
                return Promise.resolve(null);
            }
        }
    })
})

const setupRecipeExecute = (recipeID, notifier) => render(<RecipeExecute onConfirm={() => {}} notifier={notifier} recipeID={recipeID}/>);

describe('Ricette.jsx can correctly execute recipe', () => {
    test('open recipe execute but dont create beer', async () => {
        await act(() => render(<Ricette/>));
        await act(() => fireEvent.click(screen.getAllByLabelText("Esegui")[1]));
        await act(() => fireEvent.click(screen.getAllByText("Cancel")[0]));
    })

    test('open recipe execute and create beer but invalid quantity', async () => {
        equipmentFlick = false;
        await act(() => setupRecipeExecute("recipeID"));
        equipmentFlick = true;
    })

    test('open recipe execute and create beer but invalid name', async () => {
        await act(() => setupRecipeExecute("recipeID"));
        await act(() => fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: ""}}));
        await act(() => fireEvent.click(screen.getAllByText("Crea")[0]));
    })

    test('open recipe execute and create beer but invalid quantity', async () => {
        await act(() => setupRecipeExecute("recipeID"));
        await act(() => fireEvent.change(screen.getByLabelText("Beer Quantity"), {target: {value: "0"}}));
        await act(() => fireEvent.click(screen.getAllByText("Crea")[0]));
    })
    
    test('open recipe execute and create beer with predefined name', async () => {
        await act(() => setupRecipeExecute("recipeID", FAKE_NOTIFIER));
        await act(() => fireEvent.change(screen.getByLabelText("Beer Quantity"), {target: {value: "12"}}));
        await act(() => fireEvent.click(screen.getAllByText("Crea")[0]));
    })

    test('open recipe execute and create beer but not enoght equipment', async () => {
        await act(() => setupRecipeExecute("recipeID"));
        await act(() => fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: "newBeerName"}}));
        await act(() => fireEvent.change(screen.getByLabelText("Beer Quantity"), {target: {value: "90"}}));
        await act(() => fireEvent.click(screen.getAllByText("Crea")[0]));
    })

    test('open recipe execute and create beer but not enoght ingredient', async () => {
        await act(() => setupRecipeExecute("recipeID2"));
        statusFlick = false;
        await act(() => fireEvent.change(screen.getByLabelText("Beer Name"), {target: {value: "newBeerName"}}));
        await act(() => fireEvent.change(screen.getByLabelText("Beer Quantity"), {target: {value: "1"}}));
        await act(() => fireEvent.click(screen.getAllByText("Crea")[0]));
    })
})
