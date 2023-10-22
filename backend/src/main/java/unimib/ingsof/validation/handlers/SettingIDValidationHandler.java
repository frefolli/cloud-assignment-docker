package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongSettingIDException;
import unimib.ingsof.persistence.service.Protocol;

public class SettingIDValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get(Protocol.SETTING_ID_BODY_KEY) == null)
			throw new WrongSettingIDException();
		return super.handle(object);
	}
}