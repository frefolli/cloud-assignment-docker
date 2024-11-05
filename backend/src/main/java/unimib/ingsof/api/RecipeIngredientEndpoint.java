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
import unimib.ingsof.logic.RecipeIngredientController;
import unimib.ingsof.persistence.view.RecipeIngredientView;

@RestController
@RequestMapping("/api/recipes/{recipeID}/{ingredientID}")
public class RecipeIngredientEndpoint {
	@GetMapping
	public ResponseEntity<RecipeIngredientView> getRecipeIngredientByID(@PathVariable String recipeID,
															@PathVariable String ingredientID) {
		try {
			RecipeIngredientView recipeIngredientView = RecipeIngredientController.getInstance().getIngredient(recipeID, ingredientID);
			return new ResponseEntity<>(recipeIngredientView, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	public ResponseEntity<RecipeIngredientView> updateRecipeIngredient(@PathVariable String recipeID,
															@PathVariable String ingredientID,
															@RequestBody Map<String, String> ingredientObject) {
		try {
			RecipeIngredientView recipeIngredientView = RecipeIngredientController.getInstance().updateIngredient(recipeID, ingredientID, ingredientObject);
			return new ResponseEntity<>(recipeIngredientView, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteRecipeIngredient(@PathVariable String recipeID,
															@PathVariable String ingredientID) {
		RecipeIngredientController.getInstance().deleteIngredient(recipeID, ingredientID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
