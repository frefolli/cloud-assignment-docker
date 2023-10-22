package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.DescriptionDefaultingValidationHandler;
import unimib.ingsof.validation.handlers.NoteTypeDefaultingValidationHandler;

public class BeerNoteInitializationValidator extends BaseValidationHandler {
	private static BeerNoteInitializationValidator instance;
	
	public static synchronized BeerNoteInitializationValidator getInstance() {
		if (BeerNoteInitializationValidator.instance == null)
			BeerNoteInitializationValidator.instance = new BeerNoteInitializationValidator();
		return BeerNoteInitializationValidator.instance;
	}
	
	public BeerNoteInitializationValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler noteTypeHandler = new NoteTypeDefaultingValidationHandler();
		BaseValidationHandler descriptionDefaultingHandler = new DescriptionDefaultingValidationHandler();
		noteTypeHandler.setNext(descriptionDefaultingHandler);
		bodyHandler.setNext(noteTypeHandler);
		this.setNext(bodyHandler);
	}
}