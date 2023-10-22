package unimib.ingsof.persistence.view;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class RecipeViewTest {
	@Test
	void testBehavior() {
		RecipeView recipeView = new RecipeView("recipeID", "recipeName", "recipeDescription", null);
		recipeView = new RecipeView();
		recipeView.setName("newRecipeName");
		recipeView.setDescription("newRecipeDescription");
		recipeView.setRecipeID("newRecipeID");
		recipeView.setIngredients(null);
		assertEquals("newRecipeID", recipeView.getRecipeID());
		assertEquals("newRecipeName", recipeView.getName());
		assertEquals("newRecipeDescription", recipeView.getDescription());
		assertEquals(null, recipeView.getIngredients());
	}
}