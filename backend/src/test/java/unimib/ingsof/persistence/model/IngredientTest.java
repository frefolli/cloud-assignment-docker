package unimib.ingsof.persistence.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class IngredientTest {
	@Test
	void testBehavior() {
		Ingredient ingredient = new Ingredient("recipeID", "recipeName");
		ingredient.setName("newRecipeName");
		ingredient.setIngredientID("newRecipeID");
		assertEquals("newRecipeID", ingredient.getIngredientID());
		assertEquals("newRecipeName", ingredient.getName());
	}
}
