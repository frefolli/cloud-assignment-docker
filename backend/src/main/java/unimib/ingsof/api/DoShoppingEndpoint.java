package unimib.ingsof.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.logic.ShoppingController;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/shopping")
public class DoShoppingEndpoint {
	@PostMapping
    public ResponseEntity<Object> postShoppingList(@RequestBody List<Map<String, String>> ingredients) throws WrongIDGenerationInitialization, DoesntExistsException {
		try {
			ShoppingController.getInstance().postShoppingList(ingredients);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (ValidationException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }
}
