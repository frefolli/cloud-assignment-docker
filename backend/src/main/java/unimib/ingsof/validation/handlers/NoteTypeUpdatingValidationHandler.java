package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.service.Protocol;

public class NoteTypeUpdatingValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		String noteType = object.get(Protocol.NOTETYPE_BODY_KEY);
		if (noteType != null && !Protocol.NOTETYPES.contains(noteType))
			throw new WrongBodyException();
		return super.handle(object);
	}
}