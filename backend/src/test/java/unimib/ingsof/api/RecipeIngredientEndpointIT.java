package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.junit.Assert.assertEquals;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.logic.RepositoryResetController;
import unimib.ingsof.persistence.service.Protocol;

@SpringBootTest
class RecipeIngredientEndpointIT {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	private RecipeIngredientEndpoint recipeIngredientEndpoint;
	@Autowired
	RepositoryResetController resetController;

	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		
		String recipeName = "RecipeIngredientControllerTest";
		String ingredientID = recipeName;
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put(Protocol.NAME_BODY_KEY, recipeName);
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);

		assertTrue(recipeIngredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is4xxClientError());
		
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put(Protocol.NAME_BODY_KEY, ingredientID);
		ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "7");
		ingredientID = recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getHeaders().getFirst(Protocol.INGREDIENT_ID_HEADER_KEY);
		
		assertTrue(recipeIngredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is2xxSuccessful());
		
		ingredientBody.clear();
		ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "17");
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(17, recipeIngredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getBody().getQuantity(), 0.1);
		
		assertTrue(recipeIngredientEndpoint.deleteRecipeIngredient(recipeID, ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(recipeIngredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is4xxClientError());

		resetController.doDrop();
	}
	
	@Test
	void allGoesWrong() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		
		String recipeName = "RecipeIngredientControllerTest";
		String ingredientID = recipeName;
		
		Map<String, String> recipeBody = new TreeMap<>();
		recipeBody.put(Protocol.NAME_BODY_KEY, recipeName);
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
		
		Map<String, String> ingredientBody = null;
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody = new TreeMap<>();
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put(Protocol.QUANTITY_BODY_KEY, ingredientID);
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "17");
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		resetController.doDrop();
	}
}
