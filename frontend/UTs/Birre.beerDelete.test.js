import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import { act } from "react-test-renderer";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var recipes = {
  "recipeID": {
      recipeID: "recipeID", name: "recipeName",
      description: "recipeDescription", ingredients: []
  }
}

var beers = {
  "beerID": {
      name: "beerName", recipeID: null,
      beerID: "beerID", notes: [
        {
          beerID: "beerID", noteID: "noteID",
          noteType: "generic", description: "noteDescription"
        }
      ]
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url.startsWith(SETTINGS_ENDPOINT + "/"))
          return Promise.resolve({value:"default"})
         if (url.startsWith("/api/recipes")) {
            if (url === "/api/recipes")
              return Promise.resolve(Object.keys(recipes));
            else {
                let recipeID = url.replace("/api/recipes/", "");
                return Promise.resolve(recipes[recipeID]);
            }
        } else if (url.startsWith("/api/beers")) {
            if (url === "/api/beers" || url.startsWith("/api/beers?"))
              return Promise.resolve(Object.keys(beers));
            else {
                let beerID = url.replace("/api/beers/", "");
                return Promise.resolve(beers[beerID]);
            }
        }
    },
  })
)

describe('Birre.jsx can correctly render page', () => {
  test('open beer delete but dont delete', async () => {
      await act(() => {render(<Birre/>);});
      await act(() => {fireEvent.click(screen.getAllByLabelText("Elimina")[0])});
      expect(screen.getByText("Sei sicuro di voler eliminare questa birra?", {exact: false})).toBeInTheDocument();
      await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
  })
  
  test('open beer delete and delete', async () => {
      await act(() => {render(<Birre/>);});
      await act(() => {fireEvent.click(screen.getAllByLabelText("Elimina")[0])});
      delete beers.beerID;
      await act(() => {fireEvent.click(screen.getByText("Conferma"))});
      expect(screen.queryByText("beerName")).toBeNull();
  })
})
