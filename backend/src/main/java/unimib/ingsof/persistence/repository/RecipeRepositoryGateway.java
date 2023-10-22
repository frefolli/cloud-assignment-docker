package unimib.ingsof.persistence.repository;

public class RecipeRepositoryGateway {
	private static RecipeRepository instance = null;
	public static RecipeRepository getInstance() {
		return instance;
	}
	public static void setInstance(RecipeRepository instance) {
		RecipeRepositoryGateway.instance= instance;
	}
	
	RecipeRepositoryGateway() {
		throw new IllegalStateException("Gateway class");
    }
}