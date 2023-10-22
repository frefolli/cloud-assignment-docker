package unimib.ingsof.persistence.view;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;

class BeerViewTest {
	@Test
	void testBehavior() {
		BeerView beerView = new BeerView();
		beerView = new BeerView("beerID", "name", "recipeID", new ArrayList<>());
		beerView.setBeerID("newBeerID");
		beerView.setName("newName");
		beerView.setRecipeID("newRecipeID");
		beerView.setNotes(new ArrayList<>());
		assertEquals("newBeerID", beerView.getBeerID());
		assertEquals("newName", beerView.getName());
		assertEquals("newRecipeID", beerView.getRecipeID());
		assertEquals(new ArrayList<>(), beerView.getNotes());
	}
}