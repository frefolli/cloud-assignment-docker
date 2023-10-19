import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import { act } from "react-test-renderer";
import { BEERS_ENDPOINT, RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    }
}

var beers = {
    "beerID": {
        recipeID: "recipeID", name: "beerName",
        beerID: "beerID", notes: []
    },
    "beerID2": {
        recipeID: "recipeID", name: "beerNome",
        beerID: "beerID2", notes: []
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url.startsWith(SETTINGS_ENDPOINT + "/" + "equipment"))
          return Promise.resolve({value:"30"})
          if (url.startsWith(SETTINGS_ENDPOINT + "/"))
            return Promise.resolve({value:"default"})
        if (url.startsWith(RECIPES_ENDPOINT)) {
            if (url === RECIPES_ENDPOINT)
              return Promise.resolve(Object.keys(recipes));
            else {
                let recipeID = url.replace(RECIPES_ENDPOINT + "/", "");
                return Promise.resolve(recipes[recipeID]);
            }
        } else if (url.startsWith(BEERS_ENDPOINT)) {
            if (url === BEERS_ENDPOINT || url.startsWith(BEERS_ENDPOINT+"?"))
              return Promise.resolve(Object.keys(beers));
            else {
                let beerID = url.replace(BEERS_ENDPOINT + "/", "");
                return Promise.resolve(beers[beerID]);
            }
        }
    },
  })
)

describe('Birre.jsx can correctly render page', () => {
    test('load page', async () => {
        await act(() => {render(<Birre/>);});
        expect(screen.getByText(beers.beerID.name, { exact: false })).toBeInTheDocument();
    })

    test('can filter beers by recipe', async () => {
        await act(() => {render(<Birre/>);});
        fireEvent.mouseDown(screen.getByLabelText("Recipe"));
        fireEvent.click(screen.getByText("recipeName"));
        await act(() => fireEvent.click(screen.getAllByText("Filtra")[1]));
    })

    test('can filter beers by name', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => fireEvent.change(screen.getByLabelText("Name"), {target: {value: "beerName"}}));
        await act(() => fireEvent.click(screen.getAllByText("Filtra")[0]));
    })

    test('can unfilter beers by recipe', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => fireEvent.click(screen.getAllByText("Togli")[1]));
    })

    test('can unfilter beers by name', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => fireEvent.click(screen.getAllByText("Togli")[0]));
    })
})
