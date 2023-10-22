package unimib.ingsof.persistence.view;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class RecipeIngredientTest {
	@Test
	void testBehavior() {
		RecipeIngredientView recipeIngredientView = new RecipeIngredientView("ingredientID", "recipeID", "ingredientName", 7);
		recipeIngredientView = new RecipeIngredientView();
		recipeIngredientView.setIngredientID("newIngredientID");
		recipeIngredientView.setRecipeID("newRecipeID");
		recipeIngredientView.setName("newIngredientName");
		recipeIngredientView.setQuantity(17);
		assertEquals("newIngredientID", recipeIngredientView.getIngredientID());
		assertEquals("newRecipeID", recipeIngredientView.getRecipeID());
		assertEquals(17, recipeIngredientView.getQuantity());
		assertEquals("newIngredientName", recipeIngredientView.getName());
	}
}
