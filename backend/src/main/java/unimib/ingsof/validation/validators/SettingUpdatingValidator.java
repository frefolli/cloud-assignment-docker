package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.ValueValidationHandler;

public class SettingUpdatingValidator extends BaseValidationHandler {
	private static SettingUpdatingValidator instance;
	
	public static synchronized SettingUpdatingValidator getInstance() {
		if (SettingUpdatingValidator.instance == null)
			SettingUpdatingValidator.instance = new SettingUpdatingValidator();
		return SettingUpdatingValidator.instance;
	}
	
	public SettingUpdatingValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler valueHandler = new ValueValidationHandler();
		bodyHandler.setNext(valueHandler);
		this.setNext(bodyHandler);
	}
}