import "@testing-library/jest-dom/extend-expect";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import ResetManager from "../src/utils/ResetManager";
import SettingsManager from '../src/utils/SettingsManager';

const resetManager = new ResetManager();
const settingsManager = new SettingsManager();
describe("ResetManager tests", () => {
    test("master test", async () => {
        await resetManager.doReset();
        await settingsManager.postSetting("ID", "value");
        await resetManager.doReset();
        expect((await settingsManager.getSettings()).length).toBe(1);
    })
})
