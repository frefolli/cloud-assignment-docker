import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-test-renderer";
import NavBarThemeManager from "../src/components/NavBarThemeManager";
import { render } from "@testing-library/react";

var settings = {
    color: {
        settingID: "color",
        value: "default"
    }
}

var fakeSettings = {
    color: {
        settingID: "color",
        value: "fake"
    }
}

var contentFlicks = {
    color: true
}

var statusFlicks = {
    color: true
}

const getStatus = (settingID) => {
    if (statusFlicks[settingID])
        return 200
    else
        return 404
}

const getSetting = (settingID) => {
    if (contentFlicks[settingID])
        return settings[settingID]
    return fakeSettings[settingID]
}

global.fetch = jest.fn().mockImplementation((url) => {
    let settingID = url.replace("/api/settings/", "");
    return Promise.resolve({
        status: getStatus(settingID),
        json: () => Promise.resolve(getSetting(settingID))
    })
});

describe("ThemeManager behave correctly", () => {
    test("theme manager request settings and all is there", async () => {
        await act(() => render(<NavBarThemeManager/>))
    })
    
    test("theme manager request settings but values are invalid", async () => {
        contentFlicks.color = false;
        await act(() => render(<NavBarThemeManager/>))
    })
    
    test("theme manager request settings but nothing is there", async () => {
        statusFlicks.color = false;
        await act(() => render(<NavBarThemeManager/>))
    })
    
    test("theme manager get triggered", async () => {
        await act(() => render(<NavBarThemeManager testThemeCookie/>))
    })
})