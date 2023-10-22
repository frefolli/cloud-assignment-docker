package unimib.ingsof.logic;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.NotEnoughIngredientsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.persistence.view.RecipeView;

@Service
public class ExecuteRecipeController {
	private static ExecuteRecipeController instance = null;
	public static ExecuteRecipeController getInstance() {
		return ExecuteRecipeController.instance;
	}
	public static void createInstance(ExecuteRecipeController instance) {
		ExecuteRecipeController.instance = instance;
	}

	public void execute(String recipeID, float multiplier) throws DoesntExistsException, ValidationException, WrongIDGenerationInitialization, NotEnoughIngredientsException {
		if (!ShoppingController.getInstance().getShoppingList(recipeID, multiplier).isEmpty()) 
			throw new NotEnoughIngredientsException();
		RecipeView recipe = RecipeController.getInstance().getRecipeByID(recipeID);
		for (RecipeIngredientView recipeIngredient : recipe.getIngredients()) {
			String ingredientID = recipeIngredient.getIngredientID();
			float inventoryIngredientQuantity = InventoryIngredientController.getInstance().getIngredient(ingredientID).getQuantity();
			float recipeIngredientQuantity =  multiplier * recipeIngredient.getQuantity();
			Map<String, String> ingredientObject = new TreeMap<>();
			ingredientObject.put(Protocol.QUANTITY_BODY_KEY,  Float.toString(inventoryIngredientQuantity-recipeIngredientQuantity));				
			InventoryIngredientController.getInstance().updateIngredient(ingredientID, ingredientObject);
		}		
	}
}