package unimib.ingsof.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Ingredient {
	@Id
	private String ingredientID;
	private String name;
	
	public Ingredient() {
		super();
	}
	
	public Ingredient(String ingredientID, String name) {
		super();
		this.ingredientID = ingredientID;
		this.name = name;
	}
	
	public String getIngredientID() {
		return ingredientID;
	}
	
	public void setIngredientID(String ingredientID) {
		this.ingredientID = ingredientID;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
}
