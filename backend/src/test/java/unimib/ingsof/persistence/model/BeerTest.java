package unimib.ingsof.persistence.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class BeerTest {
	@Test
	void testBehavior() {
		Beer newBeer = new Beer();
		Beer beer = new Beer("beerID", "beerName", "recipeID");
		newBeer.setName("newBeerName");
		beer.setRecipeID("newRecipeID");
		beer.setBeerID("newBeerID");
		assertEquals("newRecipeID", beer.getRecipeID());
		assertEquals("newBeerName", newBeer.getName());
		assertEquals("newBeerID", beer.getBeerID());
	}
}
