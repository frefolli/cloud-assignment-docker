package unimib.ingsof.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.model.RecipeIngredient;
import unimib.ingsof.model.RecipeIngredientRepository;

@RestController
@RequestMapping("/api/recipes/{recipeID}/{ingredientID}")
public class RecipeIngredientController {
	@Autowired
	private RecipeIngredientRepository ingredientRepository;
	
	@GetMapping
	public ResponseEntity<RecipeIngredient> getRecipeIngredientByID(@PathVariable String recipeID,
															@PathVariable String ingredientID) {
		RecipeIngredient ingredient = ingredientRepository.getRecipeIngredient(recipeID, ingredientID);
		if (ingredient == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(ingredient, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Object> updateRecipeIngredient(@PathVariable String recipeID,
															@PathVariable String ingredientID,
															@RequestBody Map<String, String> body) {
		if (body == null)
			return new ResponseEntity<>(HttpStatus.OK);
		String quantity = body.get("quantity");
		if (quantity != null) {
			try {
			ingredientRepository.updateRecipeIngredientQuantity(recipeID, ingredientID, Float.valueOf(quantity));
			return new ResponseEntity<>(HttpStatus.OK);
			} catch(Exception exception) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteRecipeIngredient(@PathVariable String recipeID,
															@PathVariable String ingredientID) {
		ingredientRepository.removeRecipeIngredient(recipeID, ingredientID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}