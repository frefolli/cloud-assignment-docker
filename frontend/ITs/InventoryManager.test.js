import "@testing-library/jest-dom/extend-expect";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import InventoryManager from "../src/utils/InventoryManager";
import ShoppingManager from "../src/utils/ShoppingManager";
import ResetManager from "../src/utils/ResetManager";

const shoppingManager = new ShoppingManager();
const resetManager = new ResetManager();
const inventoryManager = new InventoryManager();
describe("InventoryManager tests", () => {
    test("master test", async () => {
        await resetManager.doReset();
        
        let inventory = await inventoryManager.getIngredientList();
        expect(inventory.length).toBe(0);

        await shoppingManager.doShopping([{name: "name", quantity: 1}]);
        
        inventory = await inventoryManager.getIngredientList();
        expect(inventory.length).toBe(1);
        expect(inventory[0].name).toBe("name");
        expect(inventory[0].quantity).toBe(1);

        await inventoryManager.deleteIngredient(inventory[0].ingredientID);
        inventory = await inventoryManager.getIngredientList();
        expect(inventory.length).toBe(0);

        await resetManager.doReset();
    })
})
