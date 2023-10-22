package unimib.ingsof.generation.id;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class RandomSeedSHA512HashingGenerator extends RandomSeedHashingGenerator {
	public RandomSeedSHA512HashingGenerator() throws NoSuchAlgorithmException {
		super(MessageDigest.getInstance("SHA-512"));
	}
}