import "@testing-library/jest-dom/extend-expect";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import SettingsManager from "../src/utils/SettingsManager";
import ResetManager from "../src/utils/ResetManager";

const settingsManager = new SettingsManager();
const resetManager = new ResetManager();
describe("SettingsManager tests", () => {
    test("SettingsManager should be able to putSetting", async () => {
        await resetManager.doReset();
        
        expect((await settingsManager.getSettings()).length).toBe(1);
        await settingsManager.postSetting("ID", "value");
        expect((await settingsManager.getSettings()).length).toBe(2);
        expect((await settingsManager.getSetting("ID"))).toBe("value");
        await settingsManager.putSetting("ID", "value2");
        expect((await settingsManager.getSetting("ID"))).toBe("value2");

        await resetManager.doReset();
    })
})
