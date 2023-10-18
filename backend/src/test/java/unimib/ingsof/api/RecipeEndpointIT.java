package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

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
class RecipeEndpointIT {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	RepositoryResetController resetController;
	

	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		
		String recipeName = "RecipeControllerTest";
		String ingredientName = recipeName;
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put(Protocol.NAME_BODY_KEY, recipeName);
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
		
		assertTrue(recipeEndpoint.getRecipeByID(recipeID).getStatusCode().is2xxSuccessful());
		
		recipeBody.clear();
		recipeBody.put(Protocol.NAME_BODY_KEY, recipeName);
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is2xxSuccessful());

		recipeBody.clear();
		recipeBody.put("description", recipeName);
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is2xxSuccessful());

		recipeBody.put(Protocol.NAME_BODY_KEY, recipeName);
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is2xxSuccessful());

		recipeBody.clear();
		recipeBody.put(Protocol.NAME_BODY_KEY, ingredientName);
		recipeBody.put(Protocol.QUANTITY_BODY_KEY, "7");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, recipeBody).getStatusCode().is2xxSuccessful());
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, recipeBody).getStatusCode().is4xxClientError());
		assertTrue(recipeEndpoint.postRecipeIngredient("recipeID", recipeBody).getStatusCode().is4xxClientError());

		recipeBody.put(Protocol.QUANTITY_BODY_KEY, "-7");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, recipeBody).getStatusCode().is4xxClientError());
		assertTrue(recipeEndpoint.postRecipeIngredient("id", recipeBody).getStatusCode().is4xxClientError());
		
		assertTrue(recipeEndpoint.getRecipeByID(recipeID).getStatusCode().is2xxSuccessful());

		assertTrue(recipeEndpoint.deleteRecipe(recipeID).getStatusCode().is2xxSuccessful());
		assertTrue(recipeEndpoint.getRecipeByID(recipeID).getStatusCode().is4xxClientError());

		resetController.doDrop();
	}
	
	@Test
	void allGoesWrong() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		
		String recipeName = "name";
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put(Protocol.NAME_BODY_KEY, recipeName);
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
				
		recipeBody = null;
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());
		
		recipeBody = new TreeMap<>();
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());

		assertTrue(recipeEndpoint.deleteRecipe(recipeID).getStatusCode().is2xxSuccessful());
		
		recipeBody.put(Protocol.NAME_BODY_KEY, recipeName);
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());

		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());

		Map<String, String> ingredientBody = null;
		
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody = new TreeMap<>();
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());

		ingredientBody.put(Protocol.NAME_BODY_KEY, "name");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.clear();
		ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "quantity");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put(Protocol.NAME_BODY_KEY, "name");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());

		resetController.doDrop();
	}
}
