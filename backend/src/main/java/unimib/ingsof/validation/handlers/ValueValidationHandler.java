package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongValueException;
import unimib.ingsof.persistence.service.Protocol;

public class ValueValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get(Protocol.VALUE_BODY_KEY) == null)
			throw new WrongValueException();
		return super.handle(object);
	}
}