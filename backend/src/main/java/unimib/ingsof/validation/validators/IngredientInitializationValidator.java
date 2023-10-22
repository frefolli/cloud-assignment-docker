package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.NameValidationHandler;
import unimib.ingsof.validation.handlers.QuantityValidationHandler;

public class IngredientInitializationValidator extends BaseValidationHandler {
	private static IngredientInitializationValidator instance;
	
	public static synchronized IngredientInitializationValidator getInstance() {
		if (IngredientInitializationValidator.instance == null)
			IngredientInitializationValidator.instance = new IngredientInitializationValidator();
		return IngredientInitializationValidator.instance;
	}
	
	public IngredientInitializationValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler nameHandler = new NameValidationHandler();
		BaseValidationHandler quantityHandler = new QuantityValidationHandler();
		nameHandler.setNext(quantityHandler);
		bodyHandler.setNext(nameHandler);
		this.setNext(bodyHandler);
	}
}