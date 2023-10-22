package unimib.ingsof.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Setting {
	@Id
	private String settingID;
	private String value;
	
	public Setting() {
		super();
	}
	
	public Setting(String settingID, String value) {
		super();
		this.settingID = settingID;
		this.value = value;
	}

	public String getSettingID() {
		return settingID;
	}

	public void setSettingID(String settingID) {
		this.settingID = settingID;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
