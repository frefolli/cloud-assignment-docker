package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.DescriptionDefaultingValidationHandler;
import unimib.ingsof.validation.handlers.NameValidationHandler;

public class RecipeInitializationValidator extends BaseValidationHandler {
	private static RecipeInitializationValidator instance;
	
	public static synchronized RecipeInitializationValidator getInstance() {
		if (RecipeInitializationValidator.instance == null)
			RecipeInitializationValidator.instance = new RecipeInitializationValidator();
		return RecipeInitializationValidator.instance;
	}
	
	public RecipeInitializationValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler nameHandler = new NameValidationHandler();
		BaseValidationHandler descriptionHandler = new DescriptionDefaultingValidationHandler();
		nameHandler.setNext(descriptionHandler);
		bodyHandler.setNext(nameHandler);
		this.setNext(bodyHandler);
	}
}