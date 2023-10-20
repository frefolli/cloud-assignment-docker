import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var settings = {
    nextRecipeID: "recipeID",
    nextRecipeQuantity: "0"
}

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

var contentFlicks = {
    nextRecipeID: true,
    nextRecipeQuantity: true
}

var statusFlicks = {
  nextRecipeID: 200,
  nextRecipeQuantity: 200
};

function getStatus(url) {
  if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeID"))
  return statusFlicks.nextRecipeID;
  if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeQuantity"))
  return statusFlicks.nextRecipeQuantity;
  return 200;
};

global.fetch = jest.fn().mockImplementation((url) => {
    if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeID") && !contentFlicks.nextRecipeID)
        return Promise.resolve({});
    if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeQuantity") && !contentFlicks.nextRecipeQuantity)
        return Promise.resolve({});
    return Promise.resolve({
        status: getStatus(url),
        json: () => {
            if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeID"))
            return Promise.resolve({value:settings.nextRecipeID})
            if (url.startsWith(SETTINGS_ENDPOINT + "/" + "nextRecipeQuantity"))
            return Promise.resolve({value:settings.nextRecipeQuantity})
            if (url.startsWith(SETTINGS_ENDPOINT + "/"))
            return Promise.resolve({value:"default"})
            if (url.startsWith("/api/recipes?name="))
            return Promise.resolve(Object.keys(recipes));
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
}
)

describe('Ricette.jsx can correctly render page', () => {
    test('load page', async () => {
        await act(() => {render(<Ricette/>);});
        expect(screen.getAllByText(recipes.recipeID.name, { exact: false })[0]).toBeInTheDocument();
        expect(screen.getByText(recipes.recipeID.description, { exact: false })).toBeInTheDocument();
        await act(() => fireEvent.click(screen.getByText("Nome")));
        await act(() => fireEvent.click(screen.getByText("Descrizione")));
    })

    test('load page without nextRecipeID 1', async () => {
        settings.nextRecipeID = "";
        await act(() => {render(<Ricette/>);});
        settings.nextRecipeID = "recipeID";
    })

    test('load page without nextRecipeID 2', async () => {
        contentFlicks.nextRecipeID = "";
        await act(() => {render(<Ricette/>);});
        contentFlicks.nextRecipeID = "recipeID";
    })

    test('load page without nextRecipeID 3', async () => {
        contentFlicks.nextRecipeID = "";
        statusFlicks.nextRecipeID = 400;
        await act(() => {render(<Ricette/>);});
        statusFlicks.nextRecipeID = 200;
        contentFlicks.nextRecipeID = "recipeID";
    })

    test('load page without nextRecipeQuantity 1', async () => {
        settings.nextRecipeQuantity = "";
        await act(() => {render(<Ricette/>);});
        settings.nextRecipeQuantity = "0";
    })

    test('load page without nextRecipeQuantity 2', async () => {
        contentFlicks.nextRecipeQuantity = "";
        await act(() => {render(<Ricette/>);});
        contentFlicks.nextRecipeQuantity = "0";
    })

    test('load page without nextRecipeQuantity 3', async () => {
        contentFlicks.nextRecipeQuantity = "";
        statusFlicks.nextRecipeQuantity = 400;
        await act(() => {render(<Ricette/>);});
        statusFlicks.nextRecipeQuantity = 200;
        contentFlicks.nextRecipeQuantity = "0";
    })
    
    test('can filter recipes', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => fireEvent.change(screen.getAllByLabelText("Name")[0], {target: {value: "recipeName"}}));
        await act(() => fireEvent.click(screen.getAllByText("Filtra")[0]));
        await act(() => fireEvent.click(screen.getAllByText("Togli")[0]));
    })
    
    test('can program recipes (quantity ok, recipe ok)', async () => {
        settings.nextRecipeID = "";
        settings.nextRecipeQuantity = "0";
        await act(() => {render(<Ricette/>);});
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Recipe")));
        await act(() => fireEvent.click(screen.getAllByText("recipeName")[1]));
        await act(() => fireEvent.change(screen.getAllByLabelText("Quantity")[0], {target:{value: 10}}));
        await act(() => fireEvent.click(screen.getByText("Programma")))
    })
    
    test('can program recipes (quantity ok , recipe not ok)', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Recipe")));
        await act(() => fireEvent.click(screen.getAllByText("")[1]));
        await act(() => fireEvent.change(screen.getAllByLabelText("Quantity")[0], {target:{value: 10}}));
        await act(() => fireEvent.click(screen.getByText("Programma")))
    })
    
    test('can program recipes (quantity not ok, recipe ok)', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Recipe")));
        await act(() => fireEvent.click(screen.getAllByText("recipeName")[1]));
        await act(() => fireEvent.change(screen.getAllByLabelText("Quantity")[0], {target:{value: 0}}));
        await act(() => fireEvent.click(screen.getByText("Programma")))
    })
    
    test('can program recipes (quantity not ok, recipe not ok)', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Recipe")));
        await act(() => fireEvent.click(screen.getAllByText("")[1]));
        await act(() => fireEvent.change(screen.getAllByLabelText("Quantity")[0], {target:{value: 0}}));
        await act(() => fireEvent.click(screen.getByText("Programma")))
    })
})
