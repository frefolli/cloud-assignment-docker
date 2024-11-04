package unimib.ingsof.api;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.logic.SettingController;
import unimib.ingsof.persistence.model.Setting;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/settings/{settingID}")
public class SettingEndpoint {
	@GetMapping
	public ResponseEntity<Setting> getSetting(@PathVariable String settingID) {
		try {
			Setting setting = SettingController.getInstance().getSetting(settingID);
			return new ResponseEntity<>(setting, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping
	public ResponseEntity<Setting> updateSetting(@PathVariable String settingID, @RequestBody Map<String, String> settingObject) {
		try {
			Setting setting = SettingController.getInstance().updateSetting(settingID, settingObject);
			return new ResponseEntity<>(setting, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping
	public ResponseEntity<Object> deleteSetting(@PathVariable String settingID) {
		SettingController.getInstance().deleteSetting(settingID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
