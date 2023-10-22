package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;

public class BaseValidationHandler implements ValidationHandler {
	private ValidationHandler nextHandler;

	public void setNext(ValidationHandler nextHandler) {
		this.nextHandler = nextHandler;
	}
	
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (this.nextHandler == null)
			return object;
		return nextHandler.handle(object);
	}
}