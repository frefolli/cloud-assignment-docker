package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;

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
class SettingListEndpointIT {
	@Autowired
	RepositoryResetController resetController;
	@Autowired
	SettingListEndpoint settingListEndpoint;
	
	@Test
	void testBehavior() {
		try {
			resetController.doAssure();
		} catch (AlreadyExistsException | DoesntExistsException | ValidationException e) {
			fail();
		}
		
		int oldnum = settingListEndpoint.getSettings().getBody().size();
		
		Map<String, String> settingBody = new TreeMap<>();
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is4xxClientError());
		
		settingBody.put(Protocol.SETTING_ID_BODY_KEY, "theSettingID");
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is4xxClientError());
		
		settingBody.clear();
		settingBody.put(Protocol.VALUE_BODY_KEY, "theValue");
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is4xxClientError());

		settingBody.put(Protocol.SETTING_ID_BODY_KEY, "theSettingID");
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is2xxSuccessful());
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is4xxClientError());
		
		assertEquals(oldnum + 1, settingListEndpoint.getSettings().getBody().size());
		
		resetController.doDrop();
	}
}
