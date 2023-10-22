package unimib.ingsof;

import static org.junit.Assert.assertNotEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.persistence.service.DatasourceConfiguration;

@SpringBootTest
class ApplicationTest {
	@Test
	void datasourceTest() {
		DatasourceConfiguration config = new DatasourceConfiguration();
		assertNotEquals(config.getDataSource(), null);
	}
}