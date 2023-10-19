import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Impostazioni from "../src/pages/Impostazioni";
import { act } from "react-test-renderer";

var settings = [
    {
        settingID: "equipment", value: "30",
    }, {
        settingID: "color", value: "default",
    }, {
        settingID: "background", value: "default",
    }, {
        settingID: "name", value: "Pierino"
    }
]

const findSetting = (settingID) => {
    for (let index in settings) {
        if (settings[index].settingID === settingID)
            return settings[index];
    }
}

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
        if (url === "/api/settings")
          return Promise.resolve(settings);
        else {
            if (url.startsWith("/api/settings/")) {
                let settingID = url.replace("/api/settings/", "");
                return Promise.resolve(findSetting(settingID));
            } else {
                return Promise.resolve(null);
            }
        }
    },
  })
)


describe('Impostazioni.jsx can correctly render page', () => {
    test('load page and find equipment 1-3', async () => {
        await act(() => {render(<Impostazioni/>);});
        expect(screen.getByText("Equipaggiamento disponibile", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("Inserisci qui il tuo nome", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("Seleziona il colore del tema", { exact: false })).toBeInTheDocument();
    })
    
    test('load page and find equipment 4-6', async () => {
        await act(() => {render(<Impostazioni/>);});
        expect(screen.getByText("Seleziona lo sfondo", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("Elimina tutti i dati")).toBeInTheDocument();
        expect(screen.getByText("Resetta la prossima ricetta da eseguire")).toBeInTheDocument();
    })
})