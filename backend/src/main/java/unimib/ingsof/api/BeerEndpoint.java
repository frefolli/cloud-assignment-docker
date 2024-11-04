package unimib.ingsof.api;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.logic.BeerController;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.BeerView;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/beers/{beerID}")
public class BeerEndpoint {
	@GetMapping
	public ResponseEntity<BeerView> getBeerByID(@PathVariable String beerID) {
		try {
			BeerView beer = BeerController.getInstance().getBeerByID(beerID);
			return new ResponseEntity<>(beer, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	public ResponseEntity<BeerView> updateBeer(@PathVariable String beerID,
												@RequestBody Map<String, String> beerObject) {
		try {
			BeerView beerView = BeerController.getInstance().updateBeer(beerID, beerObject);
			return new ResponseEntity<>(beerView, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteBeer(@PathVariable String beerID) {
		BeerController.getInstance().deleteBeer(beerID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postBeerNote(@PathVariable String beerID,
														@RequestBody Map<String, String> noteObject) {
		try {
			String noteID = BeerController.getInstance().addBeerNote(beerID, noteObject);
			HttpHeaders headers = new HttpHeaders();
			headers.add(Protocol.NOTE_ID_HEADER_KEY, noteID);
	        return new ResponseEntity<>(headers, HttpStatus.CREATED);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
