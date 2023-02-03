package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.logic.ResetController;

@SpringBootTest
class SettingEndpointTest {
	@Autowired
	ResetController resetController;
	@Autowired
	SettingEndpoint settingEndpoint;
	@Autowired
	SettingListEndpoint settingListEndpoint;
	
	@Test
	void doBehavior() {
		resetController.doAssure();
		String settingID = "theSettingID";
		
		Map<String, String> settingBody = new TreeMap<>();
		settingBody.put("value", "theValue");
		settingBody.put("settingID", settingID);
		assertTrue(settingEndpoint.getSetting(settingID).getStatusCode().is4xxClientError());
		assertTrue(settingEndpoint.updateSetting(settingID, settingBody).getStatusCode().is4xxClientError());
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is2xxSuccessful());
		assertTrue(settingEndpoint.getSetting(settingID).getStatusCode().is2xxSuccessful());

		settingBody.clear();
		assertTrue(settingEndpoint.updateSetting(settingID, settingBody).getStatusCode().is4xxClientError());
		settingBody.put("value", "theValue");
		assertTrue(settingEndpoint.updateSetting(settingID, settingBody).getStatusCode().is2xxSuccessful());

		assertTrue(settingEndpoint.getSetting(settingID).getStatusCode().is2xxSuccessful());
		assertTrue(settingEndpoint.deleteSetting(settingID).getStatusCode().is2xxSuccessful());
		assertTrue(settingEndpoint.getSetting(settingID).getStatusCode().is4xxClientError());
		
		resetController.doDrop();
	}
}