import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Impostazioni from "../src/pages/Impostazioni";
import { act } from "react-test-renderer";
import SettingsReset from "../src/components/SettingsReset";

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    status: 200,
    json: () => [],
  })
)

describe('Impostazioni.jsx can reset Settings', () => {
    test('open but dont reset', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => {fireEvent.click(screen.getAllByText("Elimina tutti i dati")[0])});
        expect(screen.getByText("Sei sicuro di voler rimuovere tutti i tuoi dati?", {exact: false})).toBeInTheDocument();
        await act(() => {fireEvent.click(screen.getByText("Conferma"))});
    })
    
    test('open and reset', async () => {
        await act(() => {render(<SettingsReset masterCall={() => {}} onConfirm={() => {}}/>);});
        await act(() => {fireEvent.click(screen.getByText("Conferma"))});
    })
})