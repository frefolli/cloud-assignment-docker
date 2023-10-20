import "@testing-library/jest-dom/extend-expect";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import ShoppingManager from "../src/utils/ShoppingManager";
import RecipesManager from "../src/utils/RecipesManager";
import ResetManager from "../src/utils/ResetManager";

const shoppingManager = new ShoppingManager();
const recipesManager = new RecipesManager();
const resetManager = new ResetManager();
describe("ShoppingManager tests", () => {
    test("master test", async () => {
        await resetManager.doReset();
        
        await recipesManager.postRecipe({name: "name"});
        let recipes = await recipesManager.getRecipeList();
        await recipesManager.postIngredient(recipes[0], {name: "lievito", quantity: 1});
        
        let shoppingList = await shoppingManager.getShoppingList({recipeID: recipes[0], quantity: 1});
        expect(shoppingList.length).toBe(1);
        expect(shoppingList[0].name).toBe("lievito");
        expect(shoppingList[0].quantity).toBe(1);

        await shoppingManager.doShopping([{name: "lievito", quantity: 1}]);
        shoppingList = await shoppingManager.getShoppingList({recipeID: recipes[0], quantity: 1});
        expect(shoppingList.length).toBe(0);

        await resetManager.doReset();
    })
})
