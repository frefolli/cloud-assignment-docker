package unimib.ingsof.logic;

import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.api.ResetEndpoint;

@SpringBootTest
class ResetControllerTest {
	@Autowired
	RepositoryResetController resetController;
	@Autowired
	ResetEndpoint resetEndpoint;
	
	@Test
	void doBehavior() {
		try {
			resetController.doAssure();
			resetEndpoint.doReset();
			resetController.doDrop();
		} catch(Exception exception) {
			fail();
		}
	}
}
