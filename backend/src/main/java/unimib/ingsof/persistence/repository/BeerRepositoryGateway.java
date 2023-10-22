package unimib.ingsof.persistence.repository;

public class BeerRepositoryGateway {
	private static BeerRepository instance = null;
	public static BeerRepository getInstance() {
		return instance;
	}
	public static void setInstance(BeerRepository instance) {
		BeerRepositoryGateway.instance= instance;
	}
	
	BeerRepositoryGateway() {
		throw new IllegalStateException("Gateway class");
    }
}