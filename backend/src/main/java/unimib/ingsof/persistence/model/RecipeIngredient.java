package unimib.ingsof.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class RecipeIngredient {
	@Id
	private String ingredientID;
	private String recipeID;
	private float quantity;

	public String getIngredientID() {
		return ingredientID;
	}
	public String getRecipeID() {
		return recipeID;
	}
	public float getQuantity() {
		return quantity;
	}
	
	public void setIngredientID(String ingredientID) {
		this.ingredientID = ingredientID;
	}
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	
	public RecipeIngredient() {
		super();
	}
	
	public RecipeIngredient(String recipeID, String ingredientID, float quantity) {
		super();
		this.ingredientID = ingredientID;
		this.recipeID = recipeID;
		this.quantity = quantity;
	}
}