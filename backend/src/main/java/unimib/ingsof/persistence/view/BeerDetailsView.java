package unimib.ingsof.persistence.view;

public class BeerDetailsView {
	
	private String beerID;
	private String name; 
	private String recipeID;

	public BeerDetailsView() {
		super();
	}

	public BeerDetailsView(String beerID, String name, String recipeID) {
		super();
		this.beerID = beerID;
		this.name = name;
		this.recipeID = recipeID;
	}

	public String getBeerID() {
		return beerID;
	}

	public void setBeerID(String beerID) {
		this.beerID = beerID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRecipeID() {
		return recipeID;
	}

	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
}
