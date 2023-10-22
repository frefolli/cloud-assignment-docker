package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.InsufficientEquipmentException;
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.exceptions.NotEnoughIngredientsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.generation.id.IDGenerationFacade;
import unimib.ingsof.persistence.repository.BeerRepositoryGateway;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.validation.validators.BeerInitializationValidator;

@Service
public class BeerListController {
	private static BeerListController instance = null;
	public static BeerListController getInstance() {
		return BeerListController.instance;
	}
	public static void createInstance(BeerListController instance) {
		BeerListController.instance = instance;
	}
	
	public List<String> getAllBeerIDs(Optional<String> filterByName, Optional<String> filterByRecipeID) {
		return BeerRepositoryGateway.getInstance().getAllBeerIDs(filterByName.orElse(""), filterByRecipeID.orElse(""));
	}
	
	public String addBeer(Map<String, String> beerObject) throws ValidationException, DoesntExistsException, InternalServerException, InsufficientEquipmentException, WrongIDGenerationInitialization, NotEnoughIngredientsException {
		beerObject = BeerInitializationValidator.getInstance().handle(beerObject);
		String name = beerObject.get(Protocol.NAME_BODY_KEY);
		String recipeID = beerObject.get(Protocol.RECIPE_ID_BODY_KEY);
		float quantity = Float.parseFloat(beerObject.get(Protocol.QUANTITY_BODY_KEY));
		RecipeController.getInstance().getRecipeByID(recipeID);
		float equipment = 0;
		try {
			equipment = Float.parseFloat(SettingController.getInstance().getEquipment());
		} catch (Exception e) {
			throw new InternalServerException();
		}
		if (quantity > equipment)
			throw new InsufficientEquipmentException();
		ExecuteRecipeController.getInstance().execute(recipeID, quantity);
		String beerID = "";
		while(true) {
			beerID = IDGenerationFacade.getInstance().generateBeerID(beerObject);
			if (!BeerRepositoryGateway.getInstance().getAllBeerIDs("", "").contains(beerID))
				break;
		}
		BeerRepositoryGateway.getInstance().addBeer(beerID, name, recipeID);
		return beerID;
	}
}