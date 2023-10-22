package unimib.ingsof.persistence.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class SettingTest {
	@Test
	void testBehavior() {
		Setting recipe = new Setting("settingID", "settingValue");
		recipe.setSettingID("newSettingID");
		recipe.setValue("newSettingValue");
		assertEquals("newSettingID", recipe.getSettingID());
		assertEquals("newSettingValue", recipe.getValue());
	}
}
