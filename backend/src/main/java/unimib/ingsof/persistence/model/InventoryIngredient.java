package unimib.ingsof.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class InventoryIngredient {
	@Id
	private String ingredientID;
	private float quantity;

	public InventoryIngredient(){
		super();
	}
	
	public InventoryIngredient(String ingredientID, float quantity) {
		super();
		this.ingredientID = ingredientID;
		this.quantity = quantity;
	}

	public String getIngredientID() {
		return ingredientID;
	}

	public void setIngredientID(String ingredientID) {
		this.ingredientID = ingredientID;
	}

	public float getQuantity() {
		return quantity;
	}

	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	
}
