package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.junit.Assert.assertEquals;

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
class BeerNoteEndpointIT {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private BeerListEndpoint beerListEndpoint;
	@Autowired
	private BeerEndpoint beerEndpoint;
	@Autowired
	private BeerNoteEndpoint beerNoteEndpoint;
	@Autowired
	RepositoryResetController resetController;

	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
		
			String beerName = "BeerTest";
			String noteType = "generic";
			String description = "Descrizione";
			
			Map<String, String> recipeBody = new TreeMap<String, String>();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta");
			String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			
			Map<String, String> beerBody = new TreeMap<String, String>();
			beerBody.put(Protocol.NAME_BODY_KEY, beerName);
			beerBody.put(Protocol.RECIPE_ID_BODY_KEY, recipeID);
			
			String beerID = beerListEndpoint.postBeer(beerBody).getHeaders().getFirst(Protocol.BEER_ID_HEADER_KEY);
			
			Map<String, String> noteBody = new TreeMap<String, String>();
			noteBody.put(Protocol.NOTETYPE_BODY_KEY	, noteType);
			noteBody.put(Protocol.DESCRIPTION_BODY_KEY, description);
			String noteID = beerEndpoint.postBeerNote(beerID, noteBody).getHeaders().getFirst(Protocol.NOTE_ID_HEADER_KEY);
			
			assertTrue(beerNoteEndpoint.getBeerNoteByID(beerID, noteID).getStatusCode().is2xxSuccessful());
			
			noteBody.clear();
			noteBody.put(Protocol.NOTETYPE_BODY_KEY	, "taste");
			noteBody.put(Protocol.DESCRIPTION_BODY_KEY, "newDescription");
			assertTrue(beerNoteEndpoint.updateBeerNote(beerID, noteID, noteBody).getStatusCode().is2xxSuccessful());
			assertEquals("taste", beerNoteEndpoint.getBeerNoteByID(beerID, noteID).getBody().getNoteType());
			assertEquals("newDescription", beerNoteEndpoint.getBeerNoteByID(beerID, noteID).getBody().getDescription());
	
			assertTrue(beerNoteEndpoint.deleteBeerNote(beerID, noteID).getStatusCode().is2xxSuccessful());
			assertTrue(beerNoteEndpoint.getBeerNoteByID(beerID, noteID).getStatusCode().is4xxClientError());
	
			resetController.doDrop();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException | WrongIDGenerationInitialization | InternalServerException e) {
			fail();
		}
	}
	
	@Test
	void allGoesWrong() {
		try {
			resetController.doAssure();
		
			String beerName = "BeerTest";
			String noteType = "generic";
			String description = "Descrizione";
			
			Map<String, String> recipeBody = new TreeMap<String, String>();
			recipeBody.put(Protocol.NAME_BODY_KEY, "ricetta");
			String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst(Protocol.RECIPE_ID_HEADER_KEY);
			
			Map<String, String> beerBody = new TreeMap<String, String>();
			beerBody.put(Protocol.NAME_BODY_KEY, beerName);
			beerBody.put(Protocol.RECIPE_ID_BODY_KEY, recipeID);
			String beerID = beerListEndpoint.postBeer(beerBody).getHeaders().getFirst(Protocol.BEER_ID_HEADER_KEY);
			
			Map<String, String> noteBody = new TreeMap<String, String>();
			noteBody.put(Protocol.NOTETYPE_BODY_KEY, noteType);
			noteBody.put(Protocol.DESCRIPTION_BODY_KEY, description);
			String noteID = beerEndpoint.postBeerNote(beerID, noteBody).getHeaders().getFirst(Protocol.NOTE_ID_HEADER_KEY);
			
			assertTrue(beerNoteEndpoint.updateBeerNote("id", noteID, noteBody).getStatusCode().is4xxClientError());
	
			noteBody = null;
			assertTrue(beerNoteEndpoint.updateBeerNote(beerID, noteID, noteBody).getStatusCode().is4xxClientError());
			
			noteBody = new TreeMap<>();
			assertTrue(beerNoteEndpoint.updateBeerNote(beerID, noteID, noteBody).getStatusCode().is4xxClientError());
			
			noteBody.put(Protocol.NOTETYPE_BODY_KEY	, "tipo");
			assertTrue(beerNoteEndpoint.updateBeerNote(beerID, noteID, noteBody).getStatusCode().is4xxClientError());
			
			resetController.doDrop();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException | WrongIDGenerationInitialization | InternalServerException e) {
			fail();
		}
	}
}
