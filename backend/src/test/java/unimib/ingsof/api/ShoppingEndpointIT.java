package unimib.ingsof.api;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.logic.RepositoryResetController;
import unimib.ingsof.persistence.service.Protocol;

@SpringBootTest
class ShoppingEndpointIT {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	private InventoryEndpoint inventoryEndpoint;	
	@Autowired
	private InventoryIngredientEndpoint inventoryIngredientEndpoint;
	@Autowired
	private ShoppingEndpoint shoppingEndpoint;
	@Autowired
	RepositoryResetController resetController;
	
	@Test
	void testBehaviorGet() {
		try {
			resetController.doAssure();
			
			Map<String, String> recipeBody = new TreeMap<>();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta");
			String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
	
			Map<String, String> ingredientBody = new TreeMap<>();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "7");
			String ingredientID = recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getHeaders().getFirst(Protocol.INGREDIENT_ID_HEADER_KEY);
			inventoryEndpoint.postIngredient(ingredientBody);
			
			assertTrue(shoppingEndpoint.getShoppingList(recipeID, Optional.empty()).getStatusCode().is2xxSuccessful());
			
			Map<String, String> requestBody = new TreeMap<>();
			assertTrue(shoppingEndpoint.getShoppingList(recipeID, Optional.of(requestBody)).getBody().isEmpty());
			
			ingredientBody.clear();
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "5");
			inventoryIngredientEndpoint.updateIngredient(ingredientID, ingredientBody);
			
			assertFalse(shoppingEndpoint.getShoppingList(recipeID, Optional.empty()).getBody().isEmpty());
			assertTrue(shoppingEndpoint.getShoppingList("id", Optional.empty()).getStatusCode().is4xxClientError());
	
			Map<String, String> shoppingBody = new TreeMap<>();
			shoppingBody.put(Protocol.QUANTITY_BODY_KEY, "xx");
			assertTrue(shoppingEndpoint.getShoppingList(recipeID, Optional.of(shoppingBody)).getStatusCode().is4xxClientError());
			
			resetController.doDrop();
		} catch(AlreadyExistsException | DoesntExistsException | ValidationException | WrongIDGenerationInitialization e) {
			fail();
		}
	}

}
