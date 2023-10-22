package unimib.ingsof.generation.id;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class RandomSeedSHA256HashingGenerator extends RandomSeedHashingGenerator {
	public RandomSeedSHA256HashingGenerator() throws NoSuchAlgorithmException {
		super(MessageDigest.getInstance("SHA-256"));
	}
}
