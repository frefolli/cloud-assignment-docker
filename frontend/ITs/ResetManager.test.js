import "@testing-library/jest-dom/extend-expect";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import ResetManager from "../src/utils/ResetManager";
import SettingsManager from '../src/utils/SettingsManager';

const resetManager = new ResetManager();
const settingsManager = new SettingsManager();
describe("ResetManager tests", () => {
    test("ResetManager should be able to doReset", async () => {
        await settingsManager.postSetting("ID", "value");
        await resetManager.doReset();
        expect((await settingsManager.getSettings()).length).toBe(1);
    })
})
