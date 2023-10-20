import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Impostazioni from "../src/pages/Impostazioni";
import { act } from "react-test-renderer";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";

var settings = {
    settingID: "value"
}

var contentFlick = {
    settings: true,
    setting: true
}

var statusFlick = {
    settings: true,
    setting: true
}

function getStatus(url) {
    if (url === SETTINGS_ENDPOINT && !statusFlick.settings)
        return 400
    if (url.startsWith(SETTINGS_ENDPOINT + "/") && !statusFlick.setting)
        return 400
    return 200
}

global.fetch = jest.fn().mockImplementation((url) => {
    if (url === SETTINGS_ENDPOINT && !contentFlick.settings)
        return Promise.resolve({})
    if (url.startsWith(SETTINGS_ENDPOINT + "/") && !contentFlick.setting)
        return Promise.resolve({})
    return Promise.resolve({
        status: getStatus(url),
        json: () => {
            if (url === SETTINGS_ENDPOINT && contentFlick.settings)
                return Promise.resolve(Object.keys(settings).map(settingID => settings[settingID]));
            if (url.startsWith(SETTINGS_ENDPOINT + "/") && contentFlick.setting)
                return Promise.resolve(settings[url.replace(SETTINGS_ENDPOINT + "/", "")]);
        }
    })
})

describe('Impostazioni.jsx can correctly render this page even if there is no setting at all', () => {
    test('load page 1-3', async () => {
        statusFlick.settings = true;
        statusFlick.setting = false;
        await act(() => {render(<Impostazioni/>);});
        expect(screen.getByText("Equipaggiamento disponibile", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("Inserisci qui il tuo nome", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("Seleziona il colore del tema", { exact: false })).toBeInTheDocument();
    })

    test('load page 4-6', async () => {
        await act(() => {render(<Impostazioni/>);});
        expect(screen.getByText("Seleziona lo sfondo", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("Elimina tutti i dati")).toBeInTheDocument();
        expect(screen.getByText("Resetta la prossima ricetta da eseguire")).toBeInTheDocument();
    })

    test('load page but cannot add settings so launch snackbar', async () => {
        statusFlick.settings = false;
        statusFlick.setting = false;
        await act(() => {render(<Impostazioni/>);});
    })
})
