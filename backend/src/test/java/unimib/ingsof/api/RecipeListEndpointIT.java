package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;
import java.util.Optional;
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
class RecipeListEndpointIT {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	RepositoryResetController resetController;
	
	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		
		int oldnum = recipeListEndpoint.getRecipeIDs(Optional.empty()).getBody().size();
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put(Protocol.NAME_BODY_KEY, "RecipeListControllerTest");
		recipeBody.put(Protocol.DESCRIPTION_BODY_KEY, "RecipeListControllerTest");
		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, recipeListEndpoint.getRecipeIDs(Optional.empty()).getBody().size());
		
		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 2, recipeListEndpoint.getRecipeIDs(Optional.empty()).getBody().size());

		resetController.doDrop();
	}
	
	@Test
	void testAlternative() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		
		assertTrue(recipeListEndpoint.getRecipeIDs(Optional.of("name")).getStatusCode().is2xxSuccessful());
		
		resetController.doDrop();
	}
	
	@Test
	void allGoesWrong() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		
		Map<String, String> recipeBody = null;
		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is4xxClientError());
		
		recipeBody = new TreeMap<>();
		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is4xxClientError());
		
		resetController.doDrop();
	}
}
