package unimib.ingsof.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.logic.ShoppingController;
import unimib.ingsof.persistence.view.IngredientView;

@RestController
@RequestMapping("/api/shopping/{recipeID}")
public class ShoppingEndpoint {
	@Autowired
	ShoppingController shoppingController;

	@GetMapping
    public ResponseEntity<List<IngredientView>> getShoppingList(@PathVariable String recipeID) {
		List<IngredientView> result = new ArrayList<>();
		try {
			result = shoppingController.getShoppingList(recipeID);
		} catch (DoesntExistsException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
    }
	
	@PostMapping
    public ResponseEntity<Object> postShoppingList(@RequestBody List<Map<String, String>> ingredients) {
		try {
			shoppingController.postShoppingList(ingredients);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }
}