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
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.logic.RepositoryResetController;
import unimib.ingsof.persistence.service.Protocol;

@SpringBootTest
class BeerListEndpointIT {
	@Autowired
	private BeerListEndpoint beerListEndpoint;
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private InventoryEndpoint inventoryEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	RepositoryResetController resetController;
	
	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
			int oldnum = beerListEndpoint.getBeerIDs(Optional.empty(), Optional.empty()).getBody().size();
			
			Map<String, String> recipeBody = new TreeMap<String, String>();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta");
			String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			Map<String, String> ingredientBody = new TreeMap<String, String>();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "7");
			recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody);
			inventoryEndpoint.postIngredient(ingredientBody);	
			Map<String, String> beerBody = new TreeMap<String, String>();
			beerBody.put(Protocol.NAME_BODY_KEY, "BeerListControllerTest");
			assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
			beerBody.put(Protocol.RECIPE_ID_BODY_KEY, recipeID);
			assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is2xxSuccessful());
			assertEquals(oldnum + 1, beerListEndpoint.getBeerIDs(Optional.empty(), Optional.empty()).getBody().size());
			
			assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
			
			recipeBody.clear();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta2");
			String recipeID2 = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			ingredientBody.clear();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente2");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "1");
			recipeEndpoint.postRecipeIngredient(recipeID2, ingredientBody);
			ingredientBody.clear();
			ingredientBody.put(Protocol.NAME_BODY_KEY, "ingrediente2");
			ingredientBody.put(Protocol.QUANTITY_BODY_KEY, "50");
			beerBody.put(Protocol.QUANTITY_BODY_KEY, "50");
			inventoryEndpoint.postIngredient(ingredientBody);	
			assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
			
			resetController.doDrop();
		} catch (InternalServerException | WrongIDGenerationInitialization | ValidationException | AlreadyExistsException | DoesntExistsException e) {
			fail();
		}
	}
	
	@Test
	void testAlternative() {
		try {
			resetController.doAssure();
			assertTrue(beerListEndpoint.getBeerIDs(Optional.of("name"), Optional.of("recipeID")).getStatusCode().is2xxSuccessful());
			resetController.doDrop();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
	}
	
	@Test
	void allGoesWrong() {
		try {
			resetController.doAssure();
		
			Map<String, String> beerBody = null;
			assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
			
			beerBody = new TreeMap<>();
			assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
			
			beerBody = new TreeMap<>();
			beerBody.put(Protocol.NAME_BODY_KEY, "BeerListControllerTest");
			beerBody.put(Protocol.RECIPE_ID_BODY_KEY, "id");
			assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
			
			resetController.doDrop();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException | WrongIDGenerationInitialization | InternalServerException e) {
			fail();
		}
	}
}
