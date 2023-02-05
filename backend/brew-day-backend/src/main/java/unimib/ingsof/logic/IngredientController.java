package unimib.ingsof.logic;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.generation.id.IDGenerationFacade;
import unimib.ingsof.persistence.model.Ingredient;
import unimib.ingsof.persistence.repository.IngredientRepository;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.validation.validators.IngredientFormatterValidator;

@Service
public class IngredientController {
	@Autowired
	private IngredientRepository ingredientRepository;
	
	Ingredient getIngredientByName(String name) {
		return ingredientRepository.getIngredientByName(name);
	}

	public Ingredient addIngredient(String name) throws ValidationException, WrongIDGenerationInitialization {
		Map<String, String> seed = new TreeMap<>(); seed.put(Protocol.NAME_KEY, name);
		seed = IngredientFormatterValidator.getInstance().handle(seed);
		name = seed.get(Protocol.NAME_KEY);
		
		Ingredient ingredient = this.getIngredientByName(name);
		if(ingredient != null)
			return ingredient;
		
		String ingredientID = IDGenerationFacade.getInstance().generateIngredientID(seed);
		ingredientRepository.addIngredient(ingredientID, name);
		return this.getIngredientByName(name);
	}

	public Ingredient getIngredient(String ingredientID) throws DoesntExistsException {
		Ingredient ingredient = ingredientRepository.getIngredient(ingredientID);
		if (ingredient == null)
			throw new DoesntExistsException();
		return ingredient;
	}
}