package unimib.ingsof.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Recipe {
	@Id
	private String recipeID;
	private String name;
	private String description;
	
	public Recipe() {
		super();
	}
	
	public Recipe(String recipeID, String name, String description) {
		super();
		this.recipeID = recipeID;
		this.name = name;
		this.description = description;
	}
	
	public String getRecipeID() {
		return this.recipeID;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getDescription() {
		return this.description;
	}
	
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
}