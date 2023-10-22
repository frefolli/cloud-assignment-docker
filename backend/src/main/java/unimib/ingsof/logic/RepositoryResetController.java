package unimib.ingsof.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.persistence.repository.BeerNoteRepositoryGateway;
import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.persistence.repository.BeerRepositoryGateway;
import unimib.ingsof.persistence.repository.IngredientRepository;
import unimib.ingsof.persistence.repository.IngredientRepositoryGateway;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;
import unimib.ingsof.persistence.repository.InventoryIngredientRepositoryGateway;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeIngredientRepositoryGateway;
import unimib.ingsof.persistence.repository.RecipeRepository;
import unimib.ingsof.persistence.repository.RecipeRepositoryGateway;
import unimib.ingsof.persistence.repository.SettingRepository;
import unimib.ingsof.persistence.repository.SettingRepositoryGateway;

@Service
public class RepositoryResetController {
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
    @Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;
    @Autowired
	private IngredientRepository ingredientRepository;
    @Autowired
	private BeerRepository beerRepository;
    @Autowired
	private BeerNoteRepository beerNoteRepository;
    @Autowired
    private SettingRepository settingRepository;
	
	private static RepositoryResetController instance = null;
	public static RepositoryResetController getInstance() {
		return RepositoryResetController.instance;
	}
	public static void createInstance(RepositoryResetController instance) {
		RepositoryResetController.instance = instance;
	}

	public void doReset() throws ValidationException, AlreadyExistsException, DoesntExistsException {
		this.doDrop();
		this.doAssure();
	}
	
	public void doDrop() {
		beerNoteRepository.drop();
		beerRepository.drop();
		recipeIngredientRepository.drop();
		recipeRepository.drop();
		inventoryIngredientRepository.drop();
		ingredientRepository.drop();
		settingRepository.drop();
	}
	
	public void doAssure() throws ValidationException, AlreadyExistsException, DoesntExistsException {
		settingRepository.assure();
		ingredientRepository.assure();
		inventoryIngredientRepository.assure();
		recipeRepository.assure();
		recipeIngredientRepository.assure();
		beerRepository.assure();
		beerNoteRepository.assure();
		SettingController.getInstance().getEquipment();
	}
	public void doAssign() {
		RecipeRepositoryGateway.setInstance(recipeRepository);
		RecipeIngredientRepositoryGateway.setInstance(recipeIngredientRepository);
		InventoryIngredientRepositoryGateway.setInstance(inventoryIngredientRepository);
		IngredientRepositoryGateway.setInstance(ingredientRepository);
		BeerRepositoryGateway.setInstance(beerRepository);
		BeerNoteRepositoryGateway.setInstance(beerNoteRepository);
	    SettingRepositoryGateway.setInstance(settingRepository);
	}
}
