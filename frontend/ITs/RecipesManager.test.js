import "@testing-library/jest-dom/extend-expect";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import RecipesManager from "../src/utils/RecipesManager";
import ResetManager from "../src/utils/ResetManager";

const recipesManager = new RecipesManager();
const resetManager = new ResetManager();
describe("RecipesManager tests", () => {
    test("master test", async () => {
        await resetManager.doReset();

        // getRecipeList
        let recipes = await recipesManager.getRecipeList();
        expect(recipes.length).toBe(0);

        // postRecipe
        await recipesManager.postRecipe({name: "name", description: "desc"});
 
        recipes = await recipesManager.getRecipeList();
        expect(recipes.length).toBe(1);

        // getRecipe
        let recipe = await recipesManager.getRecipe(recipes[0]);
        expect(recipe.name).toBe("name");
        expect(recipe.description).toBe("desc");
        expect(recipe.ingredients.length).toBe(0);

        // putRecipe
        await recipesManager.putRecipe(recipes[0], {name: "name2"});

        recipe = await recipesManager.getRecipe(recipes[0]);
        expect(recipe.name).toBe("name2");
        expect(recipe.description).toBe("desc");

        // postIngredient
        await recipesManager.postIngredient(recipes[0], {name: "lievito", quantity: 1});
        recipe = await recipesManager.getRecipe(recipes[0]);
        expect(recipe.ingredients.length).toBe(1);
        expect(recipe.ingredients[0].name).toBe("lievito");
        expect(recipe.ingredients[0].quantity).toBe(1);
        
        // putIngredient
        await recipesManager.putIngredient(recipes[0], recipe.ingredients[0].ingredientID, {quantity: 2});
        recipe = await recipesManager.getRecipe(recipes[0]);
        expect(recipe.ingredients.length).toBe(1);
        expect(recipe.ingredients[0].name).toBe("lievito");
        expect(recipe.ingredients[0].quantity).toBe(2);
        
        // deleteIngredient
        await recipesManager.deleteIngredient(recipes[0], recipe.ingredients[0].ingredientID);
        recipe = await recipesManager.getRecipe(recipes[0]);
        expect(recipe.ingredients.length).toBe(0);

        // deleteRecipe
        await recipesManager.deleteRecipe(recipes[0]);
        recipes = await recipesManager.getRecipeList();
        expect(recipes.length).toBe(0);

        await resetManager.doReset();
    })
})
