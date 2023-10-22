package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.Setting;
import unimib.ingsof.persistence.repository.SettingRepositoryGateway;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.validation.validators.SettingInitializationValidator;

@Service
public class SettingListController {
	private static SettingListController instance = null;
	public static SettingListController getInstance() {
		return SettingListController.instance;
	}
	public static void createInstance(SettingListController instance) {
		SettingListController.instance = instance;
	}
	
	public List<Setting> getSettings() {
		return SettingRepositoryGateway.getInstance().getAll();
	}
	
	public String addSetting(Map<String, String> settingObject) throws ValidationException, AlreadyExistsException {
		settingObject = SettingInitializationValidator.getInstance().handle(settingObject);
		String settingID = settingObject.get(Protocol.SETTING_ID_BODY_KEY);
		String value = settingObject.get(Protocol.VALUE_BODY_KEY);
		
		Setting setting = SettingRepositoryGateway.getInstance().getSetting(settingID);
		if (setting != null)
			throw new AlreadyExistsException();
		
		SettingRepositoryGateway.getInstance().addSetting(settingID, value);
		return settingID;
	}
}