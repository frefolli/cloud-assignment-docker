import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import { act } from "react-test-renderer";
import { BEERS_ENDPOINT, RECIPES_ENDPOINT, SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import BeerView from "../src/components/BeerView";

var recipes = {
    "recipeID": {
        recipeID: "recipeID", name: "recipeName",
        description: "recipeDescription", ingredients: []
    }
}

var beers = {
    "beerID": {
        name: "beerName", recipeID: null,
        beerID: "beerID", notes: []
    },
    "beerID2": {
        recipeID: "recipeID", name: "beerName2",
        beerID: "beerID2", notes: [
            {
                beerID: "beerID2", noteID: "noteID",
                noteType: "generic", description: "noteDescription"
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
    test('open and close beer view', async () => {
        await act(() => {render(<Birre/>);});
        await act(() => {fireEvent.click(screen.getAllByLabelText("Dettagli")[0])});
        await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
    
    test('expect beer data in view', async () => {
        await act(() => {render(<BeerView beerID="beerID"/>);});
        expect(screen.getAllByText(beers.beerID.name)[0]).toBeInTheDocument();
    })
    
    test('open and close beer view, view recipe', async () => {
        await act(() => {render(<BeerView beerID="beerID2"/>);});
        beers.beerID2.notes.forEach(note => expect(screen.getAllByText(note.description, {exact: false})[0]).toBeInTheDocument());
        await act(() => {fireEvent.click(screen.getAllByText("Visualizza Ricetta")[0])});
    })
})
