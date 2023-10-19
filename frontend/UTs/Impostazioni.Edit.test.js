import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Impostazioni from "../src/pages/Impostazioni";
import { act } from "react-test-renderer";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";

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

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    status: getStatus(url),
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

describe('Impostazioni.jsx can correctly update equipement and name', () => {
    test('can update name', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => fireEvent.change(screen.getAllByLabelText("Name")[0], {target: {value: "Paolina"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[1]));
    })

    test('cannot update name with invalid name', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => fireEvent.change(screen.getAllByLabelText("Name")[0], {target: {value: ""}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[1]));
    })
    
    test('can update equipment', async () => {
        await act(() => {render(<Impostazioni/>);});
        await act(() => fireEvent.change(screen.getAllByLabelText("Equipment")[0], {target: {value: "10"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[0]));
    })

    test('cannot update name', async () => {
        statusFlick.setting = true;
        statusFlick.settings = true;
        await act(() => {render(<Impostazioni/>);});
        statusFlick.setting = false;
        statusFlick.settings = false;
        await act(() => fireEvent.change(screen.getAllByLabelText("Name")[0], {target: {value: "Paolina"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[1]));
    })
    
    test('cannot update equipment', async () => {
        statusFlick.setting = true;
        statusFlick.settings = true;
        await act(() => {render(<Impostazioni/>);});
        statusFlick.setting = false;
        statusFlick.settings = false;
        await act(() => fireEvent.change(screen.getAllByLabelText("Equipment")[0], {target: {value: "10"}}));
        await act(() => fireEvent.click(screen.getAllByText("Aggiorna")[0]));
    })
    
    test('cannot update color', async () => {
        statusFlick.setting = true;
        statusFlick.settings = true;
        await act(() => {render(<Impostazioni/>);});
        statusFlick.setting = false;
        statusFlick.settings = false;
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Color")));
        await act(() => fireEvent.click(screen.getAllByText("dark")[0]));
    })

    test('cannot update background', async () => {
        statusFlick.setting = true;
        statusFlick.settings = true;
        await act(() => {render(<Impostazioni/>);});
        statusFlick.setting = false;
        statusFlick.settings = false;
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Background")));
        await act(() => fireEvent.click(screen.getAllByText("strange")[0]));
    })
    
    test('can update color and has a masterCall', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni masterCall={() => {}}/>);});
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Color")));
        await act(() => fireEvent.click(screen.getAllByText("dark")[0]));
    })

    test('can update background', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Background")));
        await act(() => fireEvent.click(screen.getAllByText("strange")[0]));
    })
    
    test('can update color with a twin', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Color")));
        await act(() => fireEvent.click(screen.getAllByText("twin-dark")[0]));
    })

    test('can update backgroun with a twin', async () => {
        statusFlick.setting = true;
        await act(() => {render(<Impostazioni/>);});
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Background")));
        await act(() => fireEvent.click(screen.getAllByText("twin-dark")[0]));
    })
})
