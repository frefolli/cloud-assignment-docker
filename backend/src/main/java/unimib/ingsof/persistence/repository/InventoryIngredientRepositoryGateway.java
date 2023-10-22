package unimib.ingsof.persistence.repository;

public class InventoryIngredientRepositoryGateway {
	private static InventoryIngredientRepository instance = null;
	public static InventoryIngredientRepository getInstance() {
		return instance;
	}
	public static void setInstance(InventoryIngredientRepository instance) {
		InventoryIngredientRepositoryGateway.instance= instance;
	}
	
	InventoryIngredientRepositoryGateway() {
		throw new IllegalStateException("Gateway class");
    }
}