import "@testing-library/jest-dom/extend-expect";
import { ADVICE_ENDPOINT } from "../src/utils/Protocol";
import AdviceManager from "../src/utils/AdviceManager";

global.fetch = jest.fn().mockImplementation((url) => {
    if (url === ADVICE_ENDPOINT)
        return Promise.resolve({json: () => {}})
    return Promise.resolve({status: 400});
})

const adviceManager = new AdviceManager();
describe("AdviceManager tests", () => {
    test("AdviceManager should be able to getAdvice", () => {
        adviceManager.getAdvice();
    })
})
