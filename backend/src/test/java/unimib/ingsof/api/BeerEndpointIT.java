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
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.logic.RepositoryResetController;
import unimib.ingsof.persistence.service.Protocol;

@SpringBootTest
class BeerEndpointIT {
	@Autowired
	private BeerListEndpoint beerListEndpoint;
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private BeerEndpoint beerEndpoint;
	@Autowired
	RepositoryResetController resetController;
	

	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
		
			String beerName = "BeerTest";
			String description = "Descrizione";
			
			Map<String, String> recipeBody = new TreeMap<String, String>();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta");
			String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			
			Map<String, String> beerBody = new TreeMap<String, String>();
			beerBody.put(Protocol.NAME_BODY_KEY, beerName);
			beerBody.put(Protocol.RECIPE_ID_BODY_KEY, recipeID);
			
			String beerID = beerListEndpoint.postBeer(beerBody).getHeaders().getFirst(Protocol.BEER_ID_HEADER_KEY);
			assertTrue(beerEndpoint.getBeerByID(beerID).getStatusCode().is2xxSuccessful());
			
			beerBody.clear();
			beerBody.put(Protocol.NAME_BODY_KEY, "NewName");
			assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is2xxSuccessful());
	
			beerBody.put(Protocol.NAME_BODY_KEY, beerName);
			assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is2xxSuccessful());
	
			beerBody.clear();
			beerBody.put(Protocol.DESCRIPTION_BODY_KEY, description);
			assertTrue(beerEndpoint.postBeerNote(beerID, beerBody).getStatusCode().is2xxSuccessful());
			
			assertTrue(beerEndpoint.getBeerByID(beerID).getStatusCode().is2xxSuccessful());
	
			assertTrue(beerEndpoint.deleteBeer(beerID).getStatusCode().is2xxSuccessful());
			assertTrue(beerEndpoint.getBeerByID(beerID).getStatusCode().is4xxClientError());
			
			resetController.doDrop();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException | WrongIDGenerationInitialization | InternalServerException e) {
			fail();
		}
	}
	
	@Test
	void allGoesWrong() {
		try {
			resetController.doAssure();

			Map<String, String> recipeBody = new TreeMap<String, String>();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta");
			String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			
			Map<String, String> beerBody = new TreeMap<String, String>();
			String beerName = "beer";
			beerBody.put(Protocol.NAME_BODY_KEY, beerName);
			beerBody.put(Protocol.RECIPE_ID_BODY_KEY, recipeID);
			String beerID = beerListEndpoint.postBeer(beerBody).getHeaders().getFirst(Protocol.BEER_ID_HEADER_KEY);
			
			beerBody = null;
			assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is4xxClientError());
			
			beerBody = new TreeMap<>();
			assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is4xxClientError());
	
			assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is4xxClientError());
			
			beerBody.put(Protocol.NAME_BODY_KEY, beerName);
			assertTrue(beerEndpoint.updateBeer("id", beerBody).getStatusCode().is4xxClientError());
					
			Map<String, String> noteBody = null;
			assertTrue(beerEndpoint.postBeerNote(beerID, noteBody).getStatusCode().is4xxClientError());
			
			noteBody = new TreeMap<String, String>();
			noteBody.put(Protocol.NOTETYPE_BODY_KEY, "tipo");
			assertTrue(beerEndpoint.postBeerNote(beerID, noteBody).getStatusCode().is4xxClientError());
			
			assertTrue(beerEndpoint.postBeerNote("id", noteBody).getStatusCode().is4xxClientError());
	
			resetController.doDrop();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException | WrongIDGenerationInitialization | InternalServerException e) {
			fail();
		}
	}
}
