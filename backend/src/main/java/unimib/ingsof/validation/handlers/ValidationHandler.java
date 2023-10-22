package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;

public interface ValidationHandler {
	Map<String, String> handle(Map<String, String> object) throws ValidationException;
}