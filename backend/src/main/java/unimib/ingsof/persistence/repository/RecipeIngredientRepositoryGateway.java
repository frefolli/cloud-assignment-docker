package unimib.ingsof.persistence.repository;

public class RecipeIngredientRepositoryGateway {
	private static RecipeIngredientRepository instance = null;
	public static RecipeIngredientRepository getInstance() {
		return instance;
	}
	public static void setInstance(RecipeIngredientRepository instance) {
		RecipeIngredientRepositoryGateway.instance= instance;
	}
	
	RecipeIngredientRepositoryGateway() {
		throw new IllegalStateException("Gateway class");
    }
}