package unimib.ingsof.validation.validators;

import unimib.ingsof.validation.handlers.BaseValidationHandler;
import unimib.ingsof.validation.handlers.BodyValidationHandler;
import unimib.ingsof.validation.handlers.NoteTypeUpdatingValidationHandler;
import unimib.ingsof.validation.handlers.BeerNoteUpdateValidationHandler;

public class BeerNoteUpdatingValidator extends BaseValidationHandler {
	private static BeerNoteUpdatingValidator instance;
	
	public static synchronized BeerNoteUpdatingValidator getInstance() {
		if (BeerNoteUpdatingValidator.instance == null)
			BeerNoteUpdatingValidator.instance = new BeerNoteUpdatingValidator();
		return BeerNoteUpdatingValidator.instance;
	}
	
	public BeerNoteUpdatingValidator() {
		BaseValidationHandler bodyHandler = new BodyValidationHandler();
		BaseValidationHandler updateContentHandler = new BeerNoteUpdateValidationHandler();
		BaseValidationHandler noteTypeHandler = new NoteTypeUpdatingValidationHandler();
		bodyHandler.setNext(updateContentHandler);
		updateContentHandler.setNext(noteTypeHandler);
		this.setNext(bodyHandler);
	}
}