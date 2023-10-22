package unimib.ingsof.persistence.repository;

import static org.junit.Assert.fail;

import org.junit.jupiter.api.Test;

class RepositoryGatewaysTest {
	@Test
	void testBehavior() {
		try {
			new BeerNoteRepositoryGateway();
			fail();
		} catch(IllegalStateException e) {}

		try {
			new BeerRepositoryGateway();
			fail();
		} catch(IllegalStateException e) {}

		try {
			new IngredientRepositoryGateway();
			fail();
		} catch(IllegalStateException e) {}

		try {
			new RecipeIngredientRepositoryGateway();
			fail();
		} catch(IllegalStateException e) {}

		try {
			new RecipeRepositoryGateway();
			fail();
		} catch(IllegalStateException e) {}

		try {
			new InventoryIngredientRepositoryGateway();
			fail();
		} catch(IllegalStateException e) {}

		try {
			new SettingRepositoryGateway();
			fail();
		} catch(IllegalStateException e) {}
	}
}
