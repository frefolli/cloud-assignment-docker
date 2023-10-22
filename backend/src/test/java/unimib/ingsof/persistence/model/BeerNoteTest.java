package unimib.ingsof.persistence.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class BeerNoteTest {
	@Test
	void testBehavior() {
		BeerNote newBeerNote = new BeerNote();
		BeerNote beerNote = new BeerNote("noteID", "beerID", "noteType", "description");
		newBeerNote.setBeerID("newBeerID");
		beerNote.setNoteID("newNoteID");
		beerNote.setNoteType("newNoteType");
		beerNote.setDescription("newDescription");
		assertEquals("newNoteType", beerNote.getNoteType());
		assertEquals("newNoteID", beerNote.getNoteID());
		assertEquals("newBeerID", newBeerNote.getBeerID());
		assertEquals("newDescription", beerNote.getDescription());
	}
}
