import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-test-renderer";
import BodyThemeManager from "../src/components/BodyThemeManager";
import { render } from "@testing-library/react";

var settings = {
    color: {
        settingID: "color",
        value: "default"
    },
    background: {
        settingID: "background",
        value: "default"
    }
}

var contentFlicks = {
    color: true,
    background: true
}

var statusFlicks = {
    color: true,
    background: true
}

const getStatus = (settingID) => {
    if (statusFlicks[settingID])
        return 200
    else
        return 404
}

global.fetch = jest.fn().mockImplementation((url) => {
    let settingID = url.replace("/api/settings/", "");
    if (contentFlicks[settingID])
      return Promise.resolve({
          status: getStatus(settingID),
          json: () => Promise.resolve(settings[settingID])
      })
    else
      return Promise.resolve({})
});

describe("BodyThemeManager behave correctly", () => {
    test("theme manager request settings and all is there", async () => {
        await act(() => render(<BodyThemeManager/>))
    })
    
    test("theme manager request settings and all is there but wrong", async () => {
        settings.color.value = "wrong";
        settings.background.value = "wrong";
        await act(() => render(<BodyThemeManager/>))
    })
    
    test("theme manager request settings but values are invalid", async () => {
        contentFlicks.color = false;
        contentFlicks.background = false;
        await act(() => render(<BodyThemeManager/>))
    })
    
    test("theme manager request settings but nothing is there", async () => {
        contentFlicks.color = true;
        contentFlicks.background = true;
        statusFlicks.color = false;
        statusFlicks.background = false;
        await act(() => render(<BodyThemeManager/>))
    })
    
    test("theme manager get triggered", async () => {
        await act(() => render(<BodyThemeManager testThemeCookie/>))
    })
    
    test("background manager get triggered", async () => {
        await act(() => render(<BodyThemeManager testBackgroundCookie/>))
    })
})
