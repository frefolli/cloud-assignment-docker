import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Ricette from "../src/pages/Ricette";
import { act } from "react-test-renderer";
import { RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var recipes = {
}

global.fetch = jest.fn().mockImplementation((url) =>
    Promise.resolve({
        json: () => {
            if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment"))
                return Promise.resolve({value:"30"})
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
    })
)

describe('Ricette.jsx can correctly add recipe', () => {
    test('can add recipe with valid name', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.change(screen.getByLabelText("Recipe Name"), {target: {value: "newName"}})});
        await act(() => fireEvent.click(screen.getAllByLabelText("Aggiungi")[0]));
    })
    
    test('can add recipe with description but invalid name', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.change(screen.getByLabelText("Recipe Description"), {target: {value: "newDescription"}})});
        await act(() => fireEvent.click(screen.getAllByLabelText("Aggiungi")[0]));
    })
    
    test('can add recipe with invalid name', async () => {
        await act(() => {render(<Ricette/>);});
        await act(() => {fireEvent.change(screen.getByLabelText("Recipe Name"), {target: {value: ""}})});
        await act(() => fireEvent.click(screen.getAllByLabelText("Aggiungi")[0]));
    })
})
