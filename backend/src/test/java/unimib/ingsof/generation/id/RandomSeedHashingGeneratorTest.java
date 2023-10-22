package unimib.ingsof.generation.id;

import static org.junit.Assert.fail;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;

class RandomSeedHashingGeneratorTest {
	@Test
	void testBehavior() {
		try {
			IDGenerator generator = new RandomSeedHashingGenerator(MessageDigest.getInstance("SHA-512"));
			generator.generateID(new TreeMap<>());
		} catch (NoSuchAlgorithmException e) {
			fail();
		}
	}
}