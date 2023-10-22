package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.service.Protocol;

public class RecipeUpdateValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get(Protocol.NAME_BODY_KEY) == null && object.get(Protocol.DESCRIPTION_BODY_KEY) == null)
			throw new WrongBodyException();
		return super.handle(object);
	}
}