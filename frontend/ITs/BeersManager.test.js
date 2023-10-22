import "@testing-library/jest-dom/extend-expect";
import { SETTINGS_ENDPOINT } from "../src/utils/Protocol";
import BeersManager from "../src/utils/BeersManager";
import ResetManager from "../src/utils/ResetManager";
import RecipesManager from "../src/utils/RecipesManager";

const beersManager = new BeersManager();
const resetManager = new ResetManager();
const recipesManager = new RecipesManager();
describe("BeersManager tests", () => {
    test("master test", async () => {
        await resetManager.doReset();

        await recipesManager.postRecipe({name: "recipe", description: ""});
        let recipes = await recipesManager.getRecipeList();

        // getBeerList
        let beers = await beersManager.getBeerList();
        expect(beers.length).toBe(0);

        // postBeer
        await beersManager.postBeer({recipeID: recipes[0], name: "name"});
 
        beers = await beersManager.getBeerList();
        expect(beers.length).toBe(1);

        // getBeer
        let beer = await beersManager.getBeer(beers[0]);
        expect(beer.name).toBe("name");
        expect(beer.notes.length).toBe(0);

        // putBeer
        await beersManager.putBeer(beers[0], {name: "name2"});

        beer = await beersManager.getBeer(beers[0]);
        expect(beer.name).toBe("name2");

        // postNote
        await beersManager.postNote(beers[0], {noteType: "generic", description: "desc"});
        beer = await beersManager.getBeer(beers[0]);
        expect(beer.notes.length).toBe(1);
        expect(beer.notes[0].noteType).toBe("generic");
        expect(beer.notes[0].description).toBe("desc");
        
        // putNote
        await beersManager.putNote(beers[0], beer.notes[0].noteID, {noteType: "taste", description: "desc2"});
        beer = await beersManager.getBeer(beers[0]);
        expect(beer.notes.length).toBe(1);
        expect(beer.notes[0].noteType).toBe("taste");
        expect(beer.notes[0].description).toBe("desc2");
        
        // deleteNote
        await beersManager.deleteNote(beers[0], beer.notes[0].noteID);
        beer = await beersManager.getBeer(beers[0]);
        expect(beer.notes.length).toBe(0);

        // deleteBeer
        await beersManager.deleteBeer(beers[0]);
        beers = await beersManager.getBeerList();
        expect(beers.length).toBe(0);

        await resetManager.doReset();
    })
})
