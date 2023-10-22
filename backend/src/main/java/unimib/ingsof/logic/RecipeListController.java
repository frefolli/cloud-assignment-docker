package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.generation.id.IDGenerationFacade;
import unimib.ingsof.persistence.repository.RecipeRepositoryGateway;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.validation.validators.RecipeInitializationValidator;

@Service
public class RecipeListController {
	private static RecipeListController instance = null;
	public static RecipeListController getInstance() {
		return RecipeListController.instance;
	}
	public static void createInstance(RecipeListController instance) {
		RecipeListController.instance = instance;
	}
	
	public List<String> getAllRecipeIDs(Optional<String> filterByName) {
		return RecipeRepositoryGateway.getInstance().getAllRecipeIDsByName(filterByName.orElse(""));
	}
	
	public String addRecipe(Map<String, String> recipeObject) throws ValidationException, WrongIDGenerationInitialization {
		recipeObject = RecipeInitializationValidator.getInstance().handle(recipeObject);
		String name = recipeObject.get(Protocol.NAME_BODY_KEY);
		String description = recipeObject.get(Protocol.DESCRIPTION_BODY_KEY);
		
		String recipeID = "";
		while(true) {
			recipeID = IDGenerationFacade.getInstance().generateRecipeID(recipeObject);
			if (!RecipeRepositoryGateway.getInstance().getAllRecipeIDsByName("").contains(recipeID))
				break;
		}
		
		RecipeRepositoryGateway.getInstance().addRecipe(recipeID, name, description);
		return recipeID;
	}
}