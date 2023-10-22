package unimib.ingsof.persistence.view;

public class AdviceView {

	private String recipeID;
	private float quantity = 0;
	
	public AdviceView() {
		super();
	}

	public AdviceView(String recipeID, float quantity) {
		super();
		this.recipeID = recipeID;
		this.quantity = quantity;
	}

	public String getRecipeID() {
		return recipeID;
	}

	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}

	public float getQuantity() {
		return quantity;
	}

	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	
	
	
}
