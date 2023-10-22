package unimib.ingsof.persistence.service;

import static org.junit.Assert.fail;

import org.junit.jupiter.api.Test;

class ProtocolTest {
	@Test
	void testBehavior() {
		try {
			new Protocol();
			fail();
		} catch(IllegalStateException e) {}
	}
}
