import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Impostazioni from "../src/pages/Impostazioni";
import { act } from "react-test-renderer";
import NextRecipeReset from "../src/components/NextRecipeReset";

var theStatus = 200;
global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    status: theStatus,
    json: () => [],
  })
)

describe('Impostazioni.jsx can reset NextRecipeID', () => {
    test('open resetNextRecipeID but dont reset', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Resetta la prossima ricetta da eseguire")[0])});
        expect(screen.getByText("Sei sicuro di voler rimuovere la ricetta?", {exact: false})).toBeInTheDocument();
        await act(() => {fireEvent.click(screen.getByText("Conferma"))});
    })
    
    test('open resetNextRecipeID and reset', async () => {
        await act(() => {render(<NextRecipeReset onConfirm={() => {}}/>);});
        await act(() => {fireEvent.click(screen.getByText("Conferma"))});
    })
    
    test('open resetNextRecipeID and cannot reset', async () => {
        await act(() => {render(<NextRecipeReset onConfirm={() => {}}/>);});
        theStatus = 400;
        await act(() => {fireEvent.click(screen.getByText("Conferma"))});
    })
})