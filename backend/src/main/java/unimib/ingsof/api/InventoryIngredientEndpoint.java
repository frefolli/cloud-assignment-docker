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
import unimib.ingsof.logic.InventoryIngredientController;
import unimib.ingsof.persistence.view.IngredientView;

@RestController
@RequestMapping("/api/inventory/{ingredientID}")
public class InventoryIngredientEndpoint {
	@GetMapping
	public ResponseEntity<IngredientView> getIngredientByID(@PathVariable String ingredientID) {
		try {
			IngredientView ingredientView = InventoryIngredientController.getInstance().getIngredient(ingredientID);
			return new ResponseEntity<>(ingredientView, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	public ResponseEntity<IngredientView> updateIngredient(@PathVariable String ingredientID,
												@RequestBody Map<String, String> ingredientObject) {
		try {
			IngredientView ingredientView = InventoryIngredientController.getInstance().updateIngredient(ingredientID, ingredientObject);
			return new ResponseEntity<>(ingredientView, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@DeleteMapping
	public ResponseEntity<Object> deleteIngredient(@PathVariable String ingredientID) {
		InventoryIngredientController.getInstance().deleteIngredient(ingredientID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
