package unimib.ingsof.persistence.view;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class AdviceViewTest {
	@Test
	void testBehavior() {
		AdviceView adviceView = new AdviceView();
		adviceView = new AdviceView("recipeID", 1);
		adviceView.setQuantity(2);
		adviceView.setRecipeID("newRecipeID");
		assertEquals("newRecipeID", adviceView.getRecipeID());
		assertEquals(2, adviceView.getQuantity(), 0.1);
	}
}
