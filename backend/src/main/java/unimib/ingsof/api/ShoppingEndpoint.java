package unimib.ingsof.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.logic.ShoppingController;
import unimib.ingsof.persistence.view.IngredientView;

@RestController
@RequestMapping("/api/shopping/{recipeID}")
public class ShoppingEndpoint {
	@PostMapping
    public ResponseEntity<List<IngredientView>> getShoppingList(@PathVariable String recipeID, @RequestBody Optional<Map<String, String>> requestBody) throws ValidationException, WrongIDGenerationInitialization {
		List<IngredientView> result = new ArrayList<>();
		try {
			result = ShoppingController.getInstance().getShoppingList(recipeID, requestBody.orElse(null));
		} catch (DoesntExistsException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch (ValidationException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
