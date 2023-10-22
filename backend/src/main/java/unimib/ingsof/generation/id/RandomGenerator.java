package unimib.ingsof.generation.id;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;

public class RandomGenerator extends IDGenerator {
	public RandomGenerator() {
		super();
	}
	
	@Override
	protected String preprocess(Map<String, String> seed) {
		SecureRandom random = new SecureRandom();
		byte[] bytes = new byte[20];
		random.nextBytes(bytes);
		seed.put("random", Base64.getEncoder().encodeToString(bytes));
		return seed.toString();
	}
}