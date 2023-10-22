package unimib.ingsof.generation.id;

import static org.junit.Assert.fail;

import java.util.TreeMap;

import org.junit.jupiter.api.Test;

import unimib.ingsof.exceptions.WrongIDGenerationInitialization;

class IDGenerationFacadeTest {
	@Test
	void testBehavior() {
		try {
			IDGenerationFacade generator = IDGenerationFacade.getInstance();
			generator.generateIngredientID(new TreeMap<>());
			generator.generateRecipeID(new TreeMap<>());
			generator.generateBeerID(new TreeMap<>());
			generator.generateNoteID(new TreeMap<>());
		} catch (WrongIDGenerationInitialization e) {
			fail();
		}
	}
}