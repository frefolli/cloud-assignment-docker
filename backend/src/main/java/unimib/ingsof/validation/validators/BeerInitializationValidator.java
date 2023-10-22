package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.NameValidationHandler;
import unimib.ingsof.validation.handlers.QuantityDefaultingValidationHandler;
import unimib.ingsof.validation.handlers.RecipeIDValidationHandler;

public class BeerInitializationValidator extends BaseValidationHandler {
	private static BeerInitializationValidator instance;
	
	public static synchronized BeerInitializationValidator getInstance() {
		if (BeerInitializationValidator.instance == null)
			BeerInitializationValidator.instance = new BeerInitializationValidator();
		return BeerInitializationValidator.instance;
	}
	
	public BeerInitializationValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler nameHandler = new NameValidationHandler();
		BaseValidationHandler recipeIDHandler = new RecipeIDValidationHandler();
		BaseValidationHandler quantityHandler = new QuantityDefaultingValidationHandler();
		recipeIDHandler.setNext(quantityHandler);
		nameHandler.setNext(recipeIDHandler);
		bodyHandler.setNext(nameHandler);
		this.setNext(bodyHandler);
	}
}