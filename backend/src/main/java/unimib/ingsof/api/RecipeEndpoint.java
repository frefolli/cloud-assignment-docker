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
import unimib.ingsof.logic.RecipeController;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.RecipeView;

@RestController
@RequestMapping("/api/recipes/{recipeID}")
public class RecipeEndpoint {
	@GetMapping
	public ResponseEntity<RecipeView> getRecipeByID(@PathVariable String recipeID) {
		try {
			RecipeView recipe = RecipeController.getInstance().getRecipeByID(recipeID);
			return new ResponseEntity<>(recipe, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	public ResponseEntity<RecipeView> updateRecipe(@PathVariable String recipeID,
												@RequestBody Map<String, String> recipeObject) {
		try {
			RecipeView recipeView = RecipeController.getInstance().updateRecipe(recipeID, recipeObject);
			return new ResponseEntity<>(recipeView, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteRecipe(@PathVariable String recipeID) {
		RecipeController.getInstance().deleteRecipe(recipeID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postRecipeIngredient(@PathVariable String recipeID,
														@RequestBody Map<String, String> ingredientObject) {
		try {
			String ingredientID = RecipeController.getInstance().addIngredient(recipeID, ingredientObject);
			HttpHeaders headers = new HttpHeaders();
			headers.add(Protocol.INGREDIENT_ID_HEADER_KEY, ingredientID);
	        return new ResponseEntity<>(headers, HttpStatus.CREATED);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
