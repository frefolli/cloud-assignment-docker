package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongRecipeIDException;
import unimib.ingsof.persistence.service.Protocol;

public class RecipeIDValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get(Protocol.RECIPE_ID_BODY_KEY) == null)
			throw new WrongRecipeIDException();
		return super.handle(object);
	}
}