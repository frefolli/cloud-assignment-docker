package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.NameValidationHandler;

public class BeerUpdatingValidator extends BaseValidationHandler {
	private static BeerUpdatingValidator instance;
	
	public static synchronized BeerUpdatingValidator getInstance() {
		if (BeerUpdatingValidator.instance == null)
			BeerUpdatingValidator.instance = new BeerUpdatingValidator();
		return BeerUpdatingValidator.instance;
	}
	
	public BeerUpdatingValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler nameHandler = new NameValidationHandler();
		bodyHandler.setNext(nameHandler);
		this.setNext(bodyHandler);
	}
}