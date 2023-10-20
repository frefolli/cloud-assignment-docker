package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.logic.RepositoryResetController;
import unimib.ingsof.persistence.service.Protocol;

@SpringBootTest
class SettingEndpointIT {
	@Autowired
	RepositoryResetController resetController;
	@Autowired
	SettingEndpoint settingEndpoint;
	@Autowired
	SettingListEndpoint settingListEndpoint;
	
	@Test
	void doBehavior() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		String settingID = "theSettingID";
		
		Map<String, String> settingBody = new TreeMap<>();
		settingBody.put(Protocol.VALUE_BODY_KEY, "theValue");
		settingBody.put(Protocol.SETTING_ID_BODY_KEY, settingID);
		assertTrue(settingEndpoint.getSetting(settingID).getStatusCode().is4xxClientError());
		assertTrue(settingEndpoint.updateSetting(settingID, settingBody).getStatusCode().is4xxClientError());
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is2xxSuccessful());
		assertTrue(settingEndpoint.getSetting(settingID).getStatusCode().is2xxSuccessful());

		settingBody.clear();
		assertTrue(settingEndpoint.updateSetting(settingID, settingBody).getStatusCode().is4xxClientError());
		settingBody.put(Protocol.VALUE_BODY_KEY, "theValue");
		assertTrue(settingEndpoint.updateSetting(settingID, settingBody).getStatusCode().is2xxSuccessful());

		assertTrue(settingEndpoint.getSetting(settingID).getStatusCode().is2xxSuccessful());
		assertTrue(settingEndpoint.deleteSetting(settingID).getStatusCode().is2xxSuccessful());
		assertTrue(settingEndpoint.getSetting(settingID).getStatusCode().is4xxClientError());
		
		resetController.doDrop();
	}
}
