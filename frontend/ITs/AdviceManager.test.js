import "@testing-library/jest-dom/extend-expect";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import ShoppingManager from "../src/utils/ShoppingManager";
import RecipesManager from "../src/utils/RecipesManager";
import ResetManager from "../src/utils/ResetManager";
import AdviceManager from "../src/utils/AdviceManager";

const shoppingManager = new ShoppingManager();
const recipesManager = new RecipesManager();
const resetManager = new ResetManager();
const adviceManager = new AdviceManager();
describe("AdviceManager tests", () => {
    test("master test", async () => {
        await resetManager.doReset();
        
        await recipesManager.postRecipe({name: "name"});
        let recipes = await recipesManager.getRecipeList();
        await recipesManager.postIngredient(recipes[0], {name: "lievito", quantity: 1});
        await shoppingManager.doShopping([{name: "lievito", quantity: 2}]);

        let advice = await adviceManager.getAdvice();
        expect(advice.recipeID).toBe(recipes[0]);
        expect(advice.quantity).toBe(2);

        await resetManager.doReset();
    })
})
