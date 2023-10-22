package unimib.ingsof.persistence.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class RecipeTest {
	@Test
	void testBehavior() {
		Recipe recipe = new Recipe("recipeID", "recipeName", "recipeDescription");
		recipe.setName("newRecipeName");
		recipe.setDescription("newRecipeDescription");
		recipe.setRecipeID("newRecipeID");
		assertEquals("newRecipeID", recipe.getRecipeID());
		assertEquals("newRecipeName", recipe.getName());
		assertEquals("newRecipeDescription", recipe.getDescription());
	}
}
