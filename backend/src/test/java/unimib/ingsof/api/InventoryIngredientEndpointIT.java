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
class InventoryIngredientEndpointIT {
	@Autowired
	private InventoryEndpoint inventoryEndpoint;
	@Autowired
	private InventoryIngredientEndpoint ingredientEndpoint;
	@Autowired
	RepositoryResetController resetController;

	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		
		String ingredientName = "name";
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put(Protocol.NAME_BODY_KEY, ingredientName);
		ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "7");
		String ingredientID = inventoryEndpoint.postIngredient(ingredientBody).getHeaders().getFirst(Protocol.INGREDIENT_ID_HEADER_KEY);
		
		assertTrue(ingredientEndpoint.getIngredientByID(ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientEndpoint.getIngredientByID(null).getStatusCode().is4xxClientError());
		assertTrue(ingredientEndpoint.getIngredientByID("ingredienteNonPresente").getStatusCode().is4xxClientError());
		
		ingredientBody = null;
		assertTrue(ingredientEndpoint.updateIngredient(ingredientID, ingredientBody).getStatusCode().is4xxClientError());

		ingredientBody = new TreeMap<String, String>();
		assertTrue(ingredientEndpoint.updateIngredient(ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		assertTrue(ingredientEndpoint.updateIngredient(null, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "17");
		
		assertFalse(ingredientEndpoint.updateIngredient("ingredienteNonPresente", ingredientBody).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientEndpoint.updateIngredient(ingredientID, ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(17, ingredientEndpoint.getIngredientByID(ingredientID).getBody().getQuantity(), 0.1);
		
		ingredientBody.clear();
		ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "ciao");
		assertTrue(ingredientEndpoint.updateIngredient(ingredientID, ingredientBody).getStatusCode().is4xxClientError());

		
		assertTrue(ingredientEndpoint.deleteIngredient(ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientEndpoint.getIngredientByID(ingredientID).getStatusCode().is4xxClientError());
		
		resetController.doDrop();
	}
}
