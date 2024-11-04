package unimib.ingsof.api;

import java.util.Map;

import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.logic.SettingListController;
import unimib.ingsof.persistence.model.Setting;
import unimib.ingsof.persistence.service.Protocol;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/settings")
public class SettingListEndpoint {
	
	@GetMapping
	public ResponseEntity<List<Setting>> getSettings() {
		return new ResponseEntity<>(SettingListController.getInstance().getSettings(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Object> postSetting(@RequestBody Map<String, String> settingObject) {
		try {
			String settingID = SettingListController.getInstance().addSetting(settingObject);
			HttpHeaders headers = new HttpHeaders();
			headers.add(Protocol.SETTING_ID_HEADER_KEY, settingID);
			return new ResponseEntity<>(headers, HttpStatus.OK);
		} catch(ValidationException|AlreadyExistsException exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
