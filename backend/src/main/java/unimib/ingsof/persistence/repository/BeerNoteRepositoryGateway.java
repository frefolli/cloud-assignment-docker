package unimib.ingsof.persistence.repository;

public class BeerNoteRepositoryGateway {
	private static BeerNoteRepository instance = null;
	public static BeerNoteRepository getInstance() {
		return instance;
	}
	public static void setInstance(BeerNoteRepository instance) {
		BeerNoteRepositoryGateway.instance= instance;
	}
	
	BeerNoteRepositoryGateway() {
		throw new IllegalStateException("Gateway class");
    }
}