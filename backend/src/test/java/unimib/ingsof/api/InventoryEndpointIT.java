package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

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
class InventoryEndpointIT {
	@Autowired
	private InventoryEndpoint inventoryEndpoint;
	@Autowired
	private InventoryIngredientEndpoint inventoryIngredientEndpoint;
	@Autowired
	RepositoryResetController resetController;
	
	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
		
			int oldnum = inventoryEndpoint.getAllIngredients().getBody().size();
			
			String name = "name";
			Map<String, String> ingredientBody = new TreeMap<String, String>();
			ingredientBody.put(Protocol.NAME_BODY_KEY , name);
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "7");
			
			//assertTrue(inventoryController.postIngredient(ingredientBody).getStatusCode().is2xxSuccessful());
			String ingredientID = inventoryEndpoint.postIngredient(ingredientBody).getHeaders().get(Protocol.INGREDIENT_ID_HEADER_KEY).get(0);
			inventoryIngredientEndpoint.getIngredientByID(name);
			assertTrue(inventoryIngredientEndpoint.getIngredientByID(ingredientID).getStatusCode().is2xxSuccessful());
			assertEquals(oldnum + 1, inventoryEndpoint.getAllIngredients().getBody().size());
			
			assertFalse(inventoryEndpoint.postIngredient(ingredientBody).getStatusCode().is2xxSuccessful());
			assertEquals(oldnum + 1, inventoryEndpoint.getAllIngredients().getBody().size());
			
			assertFalse(inventoryEndpoint.postIngredient(null).getStatusCode().is2xxSuccessful());
			assertEquals(oldnum + 1, inventoryEndpoint.getAllIngredients().getBody().size());	
	
			resetController.doDrop();
		} catch (AlreadyExistsException | ValidationException|DoesntExistsException e) {
			fail();
		}

	}
	
	@Test
	void allGoesWrong() {
		try {
			resetController.doAssure();
	
			String ingredientID = "name";
			Map<String, String> ingredientBody = new TreeMap<String, String>();
			
			ingredientBody.put(Protocol.NAME_BODY_KEY, ingredientID);
			assertTrue(inventoryEndpoint.postIngredient(ingredientBody).getStatusCode().is4xxClientError());
			
			ingredientBody.clear();
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "7");
			assertTrue(inventoryEndpoint.postIngredient(ingredientBody).getStatusCode().is4xxClientError());
			
			ingredientBody.clear();
			assertTrue(inventoryEndpoint.postIngredient(ingredientBody).getStatusCode().is4xxClientError());
	
			resetController.doDrop();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
	}
}
