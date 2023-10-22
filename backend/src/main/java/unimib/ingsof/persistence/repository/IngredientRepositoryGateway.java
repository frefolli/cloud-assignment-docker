package unimib.ingsof.persistence.repository;

public class IngredientRepositoryGateway {
	private static IngredientRepository instance = null;
	public static IngredientRepository getInstance() {
		return instance;
	}
	public static void setInstance(IngredientRepository instance) {
		IngredientRepositoryGateway.instance= instance;
	}
	
	IngredientRepositoryGateway() {
		throw new IllegalStateException("Gateway class");
    }
}