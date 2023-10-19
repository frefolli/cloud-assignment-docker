import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import { act } from "react-test-renderer";
import { FAKE_NOTIFIER, SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import BeerEdit from "../src/components/BeerEdit";

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

const setupBeerEdit = (notifier) => render(<BeerEdit onConfirm={() => {}} notifier={notifier} beerID="beerID"/>);

describe('Birre.jsx can correctly edit recipe', () => {
    test('open beer edit and set invalid name with mocked notifier', async () => {
      await act(() => setupBeerEdit());
      await act(() => {fireEvent.change(screen.getAllByLabelText("Name")[0], {target: {value: ""}})});
      await act(() => {fireEvent.click(screen.getAllByText("Aggiorna")[0])});
    })
    
    test('open beer edit and set valid name with mocked notifier', async () => {
      await act(() => setupBeerEdit(FAKE_NOTIFIER));
      await act(() => {fireEvent.change(screen.getAllByLabelText("Name")[0], {target: {value: "newName"}})});
      await act(() => {fireEvent.click(screen.getAllByText("Aggiorna")[0])});
    })
    
    test('open beer edit and update a note type', async () => {
      await act(() => setupBeerEdit());
      await act(() => {fireEvent.change(screen.getAllByLabelText("NoteType")[0], {target: { value: "newNoteType" },});});
      await act(() => {fireEvent.click(screen.getAllByLabelText("V")[0])});
    })
    
    test('open beer edit and update a note description', async () => {
      await act(() => setupBeerEdit());
      await act(() => {fireEvent.change(screen.getAllByLabelText("Description")[0], {target: {value: "newNoteDescription"}})});
      await act(() => {fireEvent.click(screen.getAllByLabelText("V")[0])});
    })
    
    test('open beer edit and add a note with custom type', async () => {
      await act(() => setupBeerEdit());
      await act(() => {fireEvent.change(screen.getAllByLabelText("NoteType")[0], {target: { value: "newNoteType" },});});
      await act(() => {fireEvent.click(screen.getAllByLabelText("Aggiungi")[0])});
    })
    
    test('open beer edit and add a note with custom description', async () => {
      await act(() => setupBeerEdit());
      await act(() => {fireEvent.change(screen.getAllByLabelText("Description")[1], {target: {value: "newNoteDescription"}})});
      await act(() => {fireEvent.click(screen.getAllByLabelText("Aggiungi")[0])});
    })
    
    test('open beer edit and delete a note', async () => {
      await act(() => setupBeerEdit());
      await act(() => {fireEvent.click(screen.getAllByLabelText("X")[0])});
    })
    
    test('open beer edit and delete a note', async () => {
      await act(() => {render(<Birre/>);});
      await act(() => {fireEvent.click(screen.getAllByLabelText("Modifica")[0])});
      await act(() => {fireEvent.click(screen.getAllByText("Cancel")[0])});
    })
})
