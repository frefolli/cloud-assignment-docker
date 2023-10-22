package unimib.ingsof.persistence.view;

public class IngredientView {
	private String ingredientID;
	private String name;
	private float quantity;

	public String getIngredientID() {
		return this.ingredientID;
	}
	
	public float getQuantity() {
		return this.quantity;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setIngredientID(String ingredientID) {
		this.ingredientID = ingredientID;
	}
	
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public IngredientView() {
		super();
	}
	
	public IngredientView(String ingredientID, String name, float quantity) {
		super();
		this.ingredientID = ingredientID;
		this.name = name;
		this.quantity = quantity;
	}
}