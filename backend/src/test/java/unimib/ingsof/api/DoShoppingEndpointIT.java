package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
class DoShoppingEndpointIT {
	@Autowired
	private DoShoppingEndpoint shoppingEndpoint;
	@Autowired
	RepositoryResetController resetController;
	
	@Test
	void testBehaviorPost() {
		try {
			resetController.doAssure();
			List<Map<String, String>> ingredients = new ArrayList<>();
			for (int i = 1; i < 11; i++) {
				Map<String, String> ingredientObject = new TreeMap<>();
				ingredientObject.put(Protocol.NAME_BODY_KEY, String.format("ingredient#%d", i%2));
				ingredientObject.put(Protocol.QUANTITY_BODY_KEY, Float.toString(i));
				ingredients.add(ingredientObject);
			}
			assertTrue(shoppingEndpoint.postShoppingList(ingredients).getStatusCode().is2xxSuccessful());
	
			ingredients.clear();
			for (int i = 0; i < 1; i++) {
				Map<String, String> ingredientObject = new TreeMap<>();
				ingredientObject.put(Protocol.NAME_BODY_KEY, String.format("ingredient#%d", i));
				ingredientObject.put(Protocol.QUANTITY_BODY_KEY, Float.toString(-10));
				ingredients.add(ingredientObject);
			}
			assertTrue(shoppingEndpoint.postShoppingList(ingredients).getStatusCode().is4xxClientError());
			resetController.doDrop();
		} catch (AlreadyExistsException | ValidationException | WrongIDGenerationInitialization | DoesntExistsException e) {
			fail();
		}
	}
}
