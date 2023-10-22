package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.IngredientView;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.persistence.view.RecipeView;
import unimib.ingsof.validation.validators.IngredientInitializationValidator;
import unimib.ingsof.validation.validators.ShoppingListCreationValidator;

@Service
public class ShoppingController {
	private static ShoppingController instance = null;
	public static ShoppingController getInstance() {
		return ShoppingController.instance;
	}
	public static void createInstance(ShoppingController instance) {
		ShoppingController.instance = instance;
	}
	
	public IngredientView probeInventoryIngredient(String ingredientID, String ingredientName) throws ValidationException, WrongIDGenerationInitialization {
		try {
			return InventoryIngredientController.getInstance().getIngredient(ingredientID);
		} catch(DoesntExistsException exception) {
			Map<String, String> newIngredientObject = new TreeMap<>();
			newIngredientObject.put(Protocol.NAME_BODY_KEY, ingredientName);
			newIngredientObject.put(Protocol.QUANTITY_BODY_KEY, "0");
			return new IngredientView(InventoryController.getInstance().addIngredient(newIngredientObject), ingredientName, 0);
		}
	}
	
	public List<IngredientView> getShoppingList(String recipeID, Map<String, String> requestBody) throws ValidationException, DoesntExistsException, WrongIDGenerationInitialization {
		requestBody = ShoppingListCreationValidator.getInstance().handle(requestBody);
		float multiplier = Float.parseFloat(requestBody.get(Protocol.QUANTITY_BODY_KEY));
		return this.getShoppingList(recipeID, multiplier);
	}

	public List<IngredientView> getShoppingList(String recipeID, float multiplier) throws DoesntExistsException, ValidationException, WrongIDGenerationInitialization {
		ArrayList<IngredientView> result = new ArrayList<>();
		RecipeView recipe = RecipeController.getInstance().getRecipeByID(recipeID);
		for (RecipeIngredientView recipeIngredient : recipe.getIngredients()) {
			String ingredientID = recipeIngredient.getIngredientID();
			float inventoryIngredientQuantity = this.probeInventoryIngredient(ingredientID, recipeIngredient.getName()).getQuantity();
			float recipeIngredientQuantity =  multiplier * recipeIngredient.getQuantity();
			if (recipeIngredientQuantity > inventoryIngredientQuantity)
				result.add(new IngredientView(ingredientID, recipeIngredient.getName(), recipeIngredientQuantity - inventoryIngredientQuantity));
		}
		return result;
	}
	
	public void postShoppingList(List<Map<String, String>> ingredients) throws ValidationException, WrongIDGenerationInitialization, DoesntExistsException {
		List<IngredientView> updateList = new ArrayList<>();
		for (Map<String, String> ingredientObject : ingredients) {
			ingredientObject = IngredientInitializationValidator.getInstance().handle(ingredientObject);
			String ingredientName = ingredientObject.get(Protocol.NAME_BODY_KEY);
			String ingredientID = IngredientController.getInstance().addIngredient(ingredientName).getIngredientID();
			
			IngredientView inventoryIngredient = this.probeInventoryIngredient(ingredientID, ingredientName);
			inventoryIngredient.setQuantity(inventoryIngredient.getQuantity() + Float.parseFloat(ingredientObject.get(Protocol.QUANTITY_BODY_KEY)));
			updateList.add(inventoryIngredient);
		}
		
		for (IngredientView ingredient : updateList) {
			Map<String, String> newIngredientObject = new TreeMap<>();
			newIngredientObject.put(Protocol.QUANTITY_BODY_KEY, Float.toString(ingredient.getQuantity()));
			InventoryIngredientController.getInstance().updateIngredient(ingredient.getIngredientID(), newIngredientObject);
		}
	}
}
