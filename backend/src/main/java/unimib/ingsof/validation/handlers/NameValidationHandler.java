package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongNameException;
import unimib.ingsof.persistence.service.Protocol;

public class NameValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get(Protocol.NAME_BODY_KEY) == null)
			throw new WrongNameException();
		return super.handle(object);
	}
}