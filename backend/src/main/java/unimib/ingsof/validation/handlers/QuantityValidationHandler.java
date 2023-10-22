package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongQuantityException;
import unimib.ingsof.persistence.service.Protocol;

public class QuantityValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get(Protocol.QUANTITY_BODY_KEY) == null)
			throw new WrongQuantityException();
		
		Float number;
		try {
			number = Float.parseFloat(object.get(Protocol.QUANTITY_BODY_KEY));
		} catch(Exception exception) {
			throw new WrongQuantityException();
		}
		
		if (number < 0)
			throw new WrongQuantityException();
		
		return super.handle(object);
	}
}