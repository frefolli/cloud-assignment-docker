package unimib.ingsof.validation.handlers;

import java.util.Map;
import java.util.TreeMap;

import unimib.ingsof.exceptions.ValidationException;

public class BodyDefaultingValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object == null)
			object = new TreeMap<>();
		return super.handle(object);
	}
}