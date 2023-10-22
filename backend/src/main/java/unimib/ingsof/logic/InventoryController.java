package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.persistence.model.InventoryIngredient;
import unimib.ingsof.persistence.repository.InventoryIngredientRepositoryGateway;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.IngredientView;
import unimib.ingsof.validation.validators.IngredientInitializationValidator;

@Service
public class InventoryController {
	private static InventoryController instance = null;
	public static InventoryController getInstance() {
		return InventoryController.instance;
	}
	public static void createInstance(InventoryController instance) {
		InventoryController.instance = instance;
	}

	public List<IngredientView> getAll() throws DoesntExistsException {
		ArrayList<InventoryIngredient> ingredients = InventoryIngredientRepositoryGateway.getInstance().getAll();
		ArrayList<IngredientView> result =  new ArrayList<>();
		for (InventoryIngredient ingredient : ingredients) {
			String name;
			name = IngredientController.getInstance().getIngredient(ingredient.getIngredientID()).getName();
			result.add(new IngredientView(ingredient.getIngredientID(), name, ingredient.getQuantity()));
		}
		return result;
	}
	
	public String addIngredient(Map<String, String> ingredientObject) throws ValidationException, WrongIDGenerationInitialization {
		ingredientObject = IngredientInitializationValidator.getInstance().handle(ingredientObject);
		String name = ingredientObject.get(Protocol.NAME_BODY_KEY);
		float quantity = Float.parseFloat(ingredientObject.get(Protocol.QUANTITY_BODY_KEY));
		
        String ingredientID = IngredientController.getInstance().addIngredient(name).getIngredientID();
        InventoryIngredientRepositoryGateway.getInstance().addIngredient(ingredientID, quantity);
        return ingredientID;
	}
}