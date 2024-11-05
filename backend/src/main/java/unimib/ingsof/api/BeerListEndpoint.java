package unimib.ingsof.api;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.InsufficientEquipmentException;
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.exceptions.NotEnoughIngredientsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.logic.BeerListController;
import unimib.ingsof.persistence.service.Protocol;


@RestController
@RequestMapping("/api/beers")
public class BeerListEndpoint {
	@GetMapping
	public ResponseEntity<List<String>> getBeerIDs(@RequestParam("name") Optional<String> filterByName, @RequestParam("recipeID") Optional<String> filterByRecipeID) {
		return new ResponseEntity<>(BeerListController.getInstance().getAllBeerIDs(filterByName, filterByRecipeID), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postBeer(@RequestBody Map<String, String> beerObject) throws InternalServerException, WrongIDGenerationInitialization {
		try {
			String beerID = BeerListController.getInstance().addBeer(beerObject);
			HttpHeaders headers = new HttpHeaders();
			headers.add(Protocol.BEER_ID_HEADER_KEY, beerID);
			return new ResponseEntity<>(headers, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(ValidationException|NotEnoughIngredientsException|InsufficientEquipmentException exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
