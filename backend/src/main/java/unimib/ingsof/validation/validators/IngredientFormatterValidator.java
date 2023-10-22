package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.NameFormattingValidationHandler;

public class IngredientFormatterValidator extends BaseValidationHandler {
	private static IngredientFormatterValidator instance;
	
	public static synchronized IngredientFormatterValidator getInstance() {
		if (IngredientFormatterValidator.instance == null)
			IngredientFormatterValidator.instance = new IngredientFormatterValidator();
		return IngredientFormatterValidator.instance;
	}
	
	public IngredientFormatterValidator() {
		BaseValidationHandler nameHandler = new NameFormattingValidationHandler();
		this.setNext(nameHandler);
	}
}