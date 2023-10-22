package unimib.ingsof.persistence.repository;

public class SettingRepositoryGateway {
	private static SettingRepository instance = null;
	public static SettingRepository getInstance() {
		return instance;
	}
	public static void setInstance(SettingRepository instance) {
		SettingRepositoryGateway.instance= instance;
	}
	
	SettingRepositoryGateway() {
		throw new IllegalStateException("Gateway class");
    }
}