package unimib.ingsof.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.logic.RepositoryResetController;
import unimib.ingsof.persistence.service.Protocol;

@SpringBootTest
class AdviceEndpointIT {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	private InventoryEndpoint inventoryEndpoint;	
	@Autowired
	private AdviceEndpoint recipeAdviseEndpoint;
	@Autowired
	RepositoryResetController resetController;
	
	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
		
			Map<String, String> recipeBody = new TreeMap<>();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta");
			String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			
			Map<String, String> ingredientBody = new TreeMap<>();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "8");
			recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody);
			inventoryEndpoint.postIngredient(ingredientBody);
			
			assertEquals(recipeID, recipeAdviseEndpoint.getRecipeAdvice().getBody().getRecipeID());
			assertEquals(1, recipeAdviseEndpoint.getRecipeAdvice().getBody().getQuantity(), 0.1);
	
			recipeBody.clear();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta_2");
			String recipeID_2 = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			
			ingredientBody.clear();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "4");
			recipeEndpoint.postRecipeIngredient(recipeID_2, ingredientBody);
		
			assertEquals(recipeID_2, recipeAdviseEndpoint.getRecipeAdvice().getBody().getRecipeID());
			assertEquals(2, recipeAdviseEndpoint.getRecipeAdvice().getBody().getQuantity(), 0.1);
			
			recipeBody.clear();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta_3");
			String recipeID_3 = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			
			ingredientBody.clear();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "1");
			recipeEndpoint.postRecipeIngredient(recipeID_3, ingredientBody);
			
			ingredientBody.clear();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente_2");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "1");
			recipeEndpoint.postRecipeIngredient(recipeID_3, ingredientBody);
			
			ingredientBody.clear();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente_2");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "8");
			inventoryEndpoint.postIngredient(ingredientBody);
	
			assertEquals(recipeID_3, recipeAdviseEndpoint.getRecipeAdvice().getBody().getRecipeID());
			assertEquals(8, recipeAdviseEndpoint.getRecipeAdvice().getBody().getQuantity(), 0.1);
			
			recipeBody.clear();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta_2");
			recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			
			ingredientBody.clear();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente_3");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "1");
			recipeEndpoint.postRecipeIngredient(recipeID_3, ingredientBody);
			
			assertEquals(recipeID_2, recipeAdviseEndpoint.getRecipeAdvice().getBody().getRecipeID());
			assertEquals(2, recipeAdviseEndpoint.getRecipeAdvice().getBody().getQuantity(), 0.1);	
			
			recipeBody.clear();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta_2");
			String recipeID_4 = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			
			ingredientBody.clear();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente_4");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "1");
			recipeEndpoint.postRecipeIngredient(recipeID_4, ingredientBody);
			
			ingredientBody.clear();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente_4");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "100");
			inventoryEndpoint.postIngredient(ingredientBody);
		
			assertEquals(recipeID_4, recipeAdviseEndpoint.getRecipeAdvice().getBody().getRecipeID());
			assertEquals(30, recipeAdviseEndpoint.getRecipeAdvice().getBody().getQuantity(), 0.1);
			
			
			resetController.doDrop();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException | InternalServerException e) {
			fail();
		}
	}
	
	
	@Test
	void allGoesWrong() {
		try {
			resetController.doAssure();
			assertTrue(recipeAdviseEndpoint.getRecipeAdvice().getStatusCode().is4xxClientError());
			resetController.doDrop();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException | InternalServerException e) {
			fail();
		}
	}
}
