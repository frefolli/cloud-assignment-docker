import "@testing-library/jest-dom/extend-expect";
import { RESET_ENDPOINT } from "../src/utils/Protocol";
import ResetManager from "../src/utils/ResetManager";

global.fetch = jest.fn().mockImplementation((url) => {
    if (url === RESET_ENDPOINT)
        return Promise.resolve({json: () => {}})
    return Promise.resolve({status: 400});
})

const resetManager = new ResetManager();
describe("ResetManager tests", () => {
    test("ResetManager should be able to doReset", () => {
        resetManager.doReset();
    })
})
