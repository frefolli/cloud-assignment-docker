package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.RecipeUpdateValidationHandler;

public class RecipeUpdatingValidator extends BaseValidationHandler {
	private static RecipeUpdatingValidator instance;
	
	public static synchronized RecipeUpdatingValidator getInstance() {
		if (RecipeUpdatingValidator.instance == null)
			RecipeUpdatingValidator.instance = new RecipeUpdatingValidator();
		return RecipeUpdatingValidator.instance;
	}
	
	public RecipeUpdatingValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler updateContentHandler = new RecipeUpdateValidationHandler();
		bodyHandler.setNext(updateContentHandler);
		this.setNext(bodyHandler);
	}
}