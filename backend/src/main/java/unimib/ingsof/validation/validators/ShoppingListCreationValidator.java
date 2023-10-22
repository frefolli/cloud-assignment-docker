package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyDefaultingValidationHandler;
import unimib.ingsof.validation.handlers.QuantityDefaultingValidationHandler;

public class ShoppingListCreationValidator extends BaseValidationHandler {
	private static ShoppingListCreationValidator instance;
	
	public static synchronized ShoppingListCreationValidator getInstance() {
		if (ShoppingListCreationValidator.instance == null)
			ShoppingListCreationValidator.instance = new ShoppingListCreationValidator();
		return ShoppingListCreationValidator.instance;
	}
	
	public ShoppingListCreationValidator() {
		BaseValidationHandler bodyHandler = new BodyDefaultingValidationHandler();
		BaseValidationHandler quantityHandler = new QuantityDefaultingValidationHandler();
		bodyHandler.setNext(quantityHandler);
		this.setNext(bodyHandler);
	}
}