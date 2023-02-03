package unimib.ingsof.api;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.logic.ResetController;

@SpringBootTest
class RecipeListEndpointTest {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	ResetController resetController;
	
	@Test
	void testBehavior() {
		resetController.doAssure();
		
		int oldnum = recipeListEndpoint.getRecipeIDs(Optional.empty()).getBody().size();
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", "RecipeListControllerTest");
		recipeBody.put("description", "RecipeListControllerTest");
		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, recipeListEndpoint.getRecipeIDs(Optional.empty()).getBody().size());
		
		assertFalse(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, recipeListEndpoint.getRecipeIDs(Optional.empty()).getBody().size());

		resetController.doDrop();
	}
	
	@Test
	void testAlternative() {
		resetController.doAssure();
		
		assertTrue(recipeListEndpoint.getRecipeIDs(Optional.of("name")).getStatusCode().is2xxSuccessful());
		
		resetController.doDrop();
	}
	
	@Test
	void allGoesWrong() {
		resetController.doAssure();
		
		Map<String, String> recipeBody = null;
		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is4xxClientError());
		
		recipeBody = new TreeMap<>();
		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is4xxClientError());
		
		resetController.doDrop();
	}
}