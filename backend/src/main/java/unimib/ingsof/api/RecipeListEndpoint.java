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

import unimib.ingsof.logic.RecipeListController;
import unimib.ingsof.persistence.service.Protocol;

@RestController
@RequestMapping("/api/recipes")
public class RecipeListEndpoint {
	@GetMapping
	public ResponseEntity<List<String>> getRecipeIDs(@RequestParam("name") Optional<String> filterByName) {
		return new ResponseEntity<>(RecipeListController.getInstance().getAllRecipeIDs(filterByName), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postRecipe(@RequestBody Map<String, String> recipeObject) {
		try {
			String recipeID = RecipeListController.getInstance().addRecipe(recipeObject);
			HttpHeaders headers = new HttpHeaders();
			headers.add(Protocol.RECIPE_ID_HEADER_KEY, recipeID);
			return new ResponseEntity<>(headers, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
