package unimib.ingsof.api;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.logic.BeerNoteController;
import unimib.ingsof.persistence.model.BeerNote;

@RestController
@RequestMapping("/api/beers/{beerID}/{noteID}")
public class BeerNoteEndpoint {
	@GetMapping
	public ResponseEntity<BeerNote> getBeerNoteByID(@PathVariable String beerID,
															@PathVariable String noteID) {
		try {
			BeerNote beerNoteView = BeerNoteController.getInstance().getNote(beerID, noteID);
			return new ResponseEntity<>(beerNoteView, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	public ResponseEntity<BeerNote> updateBeerNote(@PathVariable String beerID,
															@PathVariable String noteID,
															@RequestBody Map<String, String> noteObject) {
		try {
			BeerNote beerNoteView = BeerNoteController.getInstance().updateNote(beerID, noteID, noteObject);
			return new ResponseEntity<>(beerNoteView, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteBeerNote(@PathVariable String beerID,
															@PathVariable String noteID) {
		BeerNoteController.getInstance().deleteNote(beerID, noteID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
