package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.service.Protocol;

public class QuantityDefaultingValidationHandler extends QuantityValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		object.computeIfAbsent(Protocol.QUANTITY_BODY_KEY, t -> "1");
		return super.handle(object);
	}
}