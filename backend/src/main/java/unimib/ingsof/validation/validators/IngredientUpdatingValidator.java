package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.QuantityValidationHandler;

public class IngredientUpdatingValidator extends BaseValidationHandler {
	private static IngredientUpdatingValidator instance;
	
	public static synchronized IngredientUpdatingValidator getInstance() {
		if (IngredientUpdatingValidator.instance == null)
			IngredientUpdatingValidator.instance = new IngredientUpdatingValidator();
		return IngredientUpdatingValidator.instance;
	}
	
	public IngredientUpdatingValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler quantityHandler = new QuantityValidationHandler();
		bodyHandler.setNext(quantityHandler);
		this.setNext(bodyHandler);
	}
}