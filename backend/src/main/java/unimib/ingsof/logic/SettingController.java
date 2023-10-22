package unimib.ingsof.logic;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.Setting;
import unimib.ingsof.persistence.repository.SettingRepositoryGateway;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.validation.validators.SettingUpdatingValidator;

@Service
public class SettingController {
	private static SettingController instance = null;
	public static SettingController getInstance() {
		return SettingController.instance;
	}
	public static void createInstance(SettingController instance) {
		SettingController.instance = instance;
	}
	
	public Setting getSetting(String settingID) throws DoesntExistsException {
		Setting setting = SettingRepositoryGateway.getInstance().getSetting(settingID);
		if (setting == null)
			throw new DoesntExistsException();
		return setting;
	}

	public Setting updateSetting(String settingID, Map<String, String> settingObject) throws ValidationException, DoesntExistsException {
		settingObject = SettingUpdatingValidator.getInstance().handle(settingObject);
		Setting setting = this.getSetting(settingID);
		
		String value = settingObject.get(Protocol.VALUE_BODY_KEY);
		SettingRepositoryGateway.getInstance().updateSetting(settingID, value);
		setting.setValue(value);
		return setting;
	}

	public void deleteSetting(String settingID) {
		SettingRepositoryGateway.getInstance().deleteSetting(settingID);
	}
	
	public String getEquipment() throws ValidationException, AlreadyExistsException, DoesntExistsException   {
		Setting setting;
		try {
			setting = getSetting(Protocol.EQUIPMENT_SETTING_ID);
		} catch (DoesntExistsException e) {
			Map<String, String> settingObject = new TreeMap<>();
			settingObject.put(Protocol.SETTING_ID_BODY_KEY, Protocol.EQUIPMENT_SETTING_ID);
			settingObject.put(Protocol.VALUE_BODY_KEY, Protocol.DEFAULT_EQUIPMENT);
			SettingListController.getInstance().addSetting(settingObject);
			setting = getSetting(Protocol.EQUIPMENT_SETTING_ID);
		}	
		return setting.getValue();
	}
	
}