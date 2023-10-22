package unimib.ingsof.generation.id;

import static org.junit.Assert.assertEquals;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;

class IDGeneratorTest {
	@Test
	void testBehavior() {
		IDGenerator generator = new IDGenerator();
		assertEquals("{}", generator.generateID(new TreeMap<>()));
	}
}
