package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.SettingIDValidationHandler;
import unimib.ingsof.validation.handlers.ValueValidationHandler;

public class SettingInitializationValidator extends BaseValidationHandler {
	private static SettingInitializationValidator instance;
	
	public static synchronized SettingInitializationValidator getInstance() {
		if (SettingInitializationValidator.instance == null)
			SettingInitializationValidator.instance = new SettingInitializationValidator();
		return SettingInitializationValidator.instance;
	}
	
	public SettingInitializationValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler settingIDHandler = new SettingIDValidationHandler();
		BaseValidationHandler valueHandler = new ValueValidationHandler();
		settingIDHandler.setNext(valueHandler);
		bodyHandler.setNext(settingIDHandler);
		this.setNext(bodyHandler);
	}
}