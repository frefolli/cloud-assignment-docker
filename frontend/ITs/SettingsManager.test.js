import "@testing-library/jest-dom/extend-expect";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import SettingsManager from "../src/utils/SettingsManager";

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
    if (url.startsWith(SETTINGS_ENDPOINT+"/") && !statusFlick.setting)
        return 400
    return 200
}

global.fetch = jest.fn().mockImplementation((url) => {
    if (url === SETTINGS_ENDPOINT && !contentFlick.settings)
        return Promise.resolve({})
    if (url.startsWith(SETTINGS_ENDPOINT+"/") && !contentFlick.setting)
        return Promise.resolve({})
    return Promise.resolve({
        status: getStatus(url),
        json: () => {
            if (url === SETTINGS_ENDPOINT && contentFlick.settings)
                return Promise.resolve(Object.keys(settings).map(settingID => settings[settingID]));
            if (url.startsWith(SETTINGS_ENDPOINT+"/") && contentFlick.setting)
                return Promise.resolve(settings[url.replace(SETTINGS_ENDPOINT+"/", "")]);
        }
    })
})

const settingsManager = new SettingsManager();
describe("SettingsManager tests", () => {
    test("SettingsManager should be able to getSettings", () => {
        contentFlick.settings = false;
        settingsManager.getSettings().catch(() => {});
        contentFlick.settings = true;
        settingsManager.getSettings();
    })

    test("SettingsManager should be able to getSetting", () => {
        contentFlick.setting = false;
        settingsManager.getSetting("settingID").catch(() => {});
        contentFlick.setting = true;
        settingsManager.getSetting("settingID");
    })
    
    test("SettingsManager should be able to postSetting", () => {
        statusFlick.settings = false;
        settingsManager.postSetting("settingID", "value").catch(() => {});
        statusFlick.settings = true;
        settingsManager.postSetting("settingID", "value");
    })
    
    test("SettingsManager should be able to putSetting", () => {
        statusFlick.setting = false;
        settingsManager.putSetting("settingID", "value").catch(() => {});
        statusFlick.setting = true;
        settingsManager.putSetting("settingID", "value");
    })
})
