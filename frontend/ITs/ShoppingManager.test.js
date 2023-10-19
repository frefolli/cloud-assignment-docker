import "@testing-library/jest-dom/extend-expect";
import { SHOPPING_ENDPOINT } from "../src/utils/Protocol";
import ShoppingManager from "../src/utils/ShoppingManager";

global.fetch = jest.fn().mockImplementation((url) => {
    if (url === SHOPPING_ENDPOINT)
        return Promise.resolve({json: () => {}})
    return Promise.resolve({status: 400});
})

const shoppingManager = new ShoppingManager();
describe("ShoppingManager tests", () => {
    test("ShoppingManager should be able to getShopping", () => {
        shoppingManager.getShoppingList({});
    })
})
