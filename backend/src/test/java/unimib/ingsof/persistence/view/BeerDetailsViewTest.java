package unimib.ingsof.persistence.view;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class BeerDetailsViewTest {
	@Test
	void testBehavior() {
		BeerDetailsView beerDetailsView = new BeerView();
		beerDetailsView = new BeerDetailsView("beerID", "name", "recipeID");
		beerDetailsView.setBeerID("newBeerID");
		beerDetailsView.setName("newName");
		beerDetailsView.setRecipeID("newRecipeID");
		assertEquals("newBeerID", beerDetailsView.getBeerID());
		assertEquals("newName", beerDetailsView.getName());
		assertEquals("newRecipeID", beerDetailsView.getRecipeID());
	}
}