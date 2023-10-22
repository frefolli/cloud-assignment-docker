package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.persistence.view.AdviceView;
import unimib.ingsof.persistence.view.RecipeIngredientView;

@Service
public class AdviceController {
	private static AdviceController instance = null;
	public static AdviceController getInstance() {
		return AdviceController.instance;
	}
	public static void createInstance(AdviceController instance) {
		AdviceController.instance = instance;
	}
	
	public AdviceView getAdvice() throws DoesntExistsException, InternalServerException {
		List<String> recipeIDs = RecipeListController.getInstance().getAllRecipeIDs(java.util.Optional.empty());
		if (recipeIDs.isEmpty())
			throw new DoesntExistsException();
		float equipment = 0;
		try {
			equipment = Float.parseFloat(SettingController.getInstance().getEquipment());
		} catch (Exception e) {
			throw new InternalServerException();
		}
		AdviceView advice = new AdviceView();
		float maxQuantitySum = -1;
		for (String recipeID : recipeIDs) {
			List<RecipeIngredientView> ingredients =  RecipeController.getInstance().getRecipeByID(recipeID).getIngredients();
			List<Float> ingredientsQuantity = new ArrayList<>();
			float literProduced = -1;
			float quantitySum = 0;
			for (RecipeIngredientView recipeIngredient : ingredients) {
				ingredientsQuantity.add(recipeIngredient.getQuantity());
				literProduced = ratioCalculator(recipeIngredient, literProduced);
			}
			if (literProduced > equipment)
				literProduced = equipment;
			if (literProduced == 0)
				continue;
			quantitySum = ingredientQuantitySum(ingredientsQuantity, literProduced);
			if(quantitySum > maxQuantitySum || maxQuantitySum == -1 ||
					(Float.compare(quantitySum, maxQuantitySum) == 0 && advice.getQuantity() < literProduced)) {
				maxQuantitySum = quantitySum;
				advice.setQuantity(literProduced);
				advice.setRecipeID(recipeID);	
			}
		}
		if(advice.getRecipeID() == null)
			throw new DoesntExistsException();
		return advice;
	}
	
	private float ingredientQuantitySum(List<Float> ingredientsQuantity, float ratio) {
		float quantitySum = 0;
		for (float ingredientQuantity : ingredientsQuantity) {
			quantitySum += ingredientQuantity*ratio;
		}
		return quantitySum;
	}
	
	private float ratioCalculator(RecipeIngredientView recipeIngredient, float maxLiterProduced) {
		String ingredientID = recipeIngredient.getIngredientID();
		float invIngQuantity;
		try {
			invIngQuantity = InventoryIngredientController.getInstance().getIngredient(ingredientID).getQuantity();
		} catch (DoesntExistsException e) {
			return 0;
		}
		float ratioIngredient = invIngQuantity/recipeIngredient.getQuantity();
		if (ratioIngredient < maxLiterProduced || maxLiterProduced < 0)
			maxLiterProduced = ratioIngredient;
		return maxLiterProduced;
		
	}
	
	
}
