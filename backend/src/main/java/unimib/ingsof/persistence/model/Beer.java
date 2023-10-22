package unimib.ingsof.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Beer {
	@Id
	private String beerID;
	private String name;
	private String recipeID;
	
	public Beer() {
		super();
	}
	
	public Beer(String beerID, String name, String recipeID) {
		super();
		this.beerID = beerID;
		this.name = name;
		this.recipeID = recipeID;
	}
	
	public String getBeerID() {
		return this.beerID;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getRecipeID() {
		return this.recipeID;
	}
	
	public void setBeerID(String beerID) {
		this.beerID = beerID;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
}