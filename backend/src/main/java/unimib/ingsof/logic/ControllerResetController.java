package unimib.ingsof.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ControllerResetController {
	@Autowired
	private AdviceController adviceController;
	@Autowired
	private BeerListController beerListController;
	@Autowired
	private BeerController beerController;
	@Autowired
	private BeerNoteController beerNoteController;
	@Autowired
	private RecipeListController recipeListController;
	@Autowired
	private RecipeController recipeController;
	@Autowired
	private RecipeIngredientController recipeIngredientController;
	@Autowired
	private InventoryController inventoryController;
	@Autowired
	private InventoryIngredientController inventoryIngredientController;
	@Autowired
	private ExecuteRecipeController executeRecipeController;
	@Autowired
	private IngredientController ingredientController;
	@Autowired
	private SettingListController settingListController;
	@Autowired
	private SettingController settingController;
	@Autowired
	private ShoppingController shoppingController;
	@Autowired
	private RepositoryResetController repositoryResetController;
	
	public void doAssign() {
		AdviceController.createInstance(adviceController);
		BeerListController.createInstance(beerListController);
		BeerController.createInstance(beerController);
		BeerNoteController.createInstance(beerNoteController);
		RecipeListController.createInstance(recipeListController);
		RecipeController.createInstance(recipeController);
		RecipeIngredientController.createInstance(recipeIngredientController);
		InventoryController.createInstance(inventoryController);
		InventoryIngredientController.createInstance(inventoryIngredientController);
		ExecuteRecipeController.createInstance(executeRecipeController);
		IngredientController.createInstance(ingredientController);
		SettingListController.createInstance(settingListController);
		SettingController.createInstance(settingController);
		ShoppingController.createInstance(shoppingController);
		RepositoryResetController.createInstance(repositoryResetController);
	}
}
