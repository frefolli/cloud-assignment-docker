package unimib.ingsof.persistence.view;

public class RecipeIngredientView extends IngredientView {
	private String recipeID;
	
	public String getRecipeID() {
		return this.recipeID;
	}
	
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
	
	public RecipeIngredientView() {
		super();
	}
	
	public RecipeIngredientView(String recipeID, String ingredientID, String name, float quantity) {
		super(ingredientID, name, quantity);
		this.recipeID = recipeID;
	}
}