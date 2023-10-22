package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.service.Protocol;

public class DescriptionDefaultingValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		object.computeIfAbsent(Protocol.DESCRIPTION_BODY_KEY, t -> "");
		return super.handle(object);
	}
}