package unimib.ingsof.persistence.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class InventoryIngredientTest {
	@Test
	void testBehavior() {
		InventoryIngredient inventoryIngredient = new InventoryIngredient("name", 5);
		inventoryIngredient.setIngredientID("newName");
		inventoryIngredient.setQuantity(9);
		assertEquals("newName", inventoryIngredient.getIngredientID());
		assertEquals(9, inventoryIngredient.getQuantity());
	}
}
