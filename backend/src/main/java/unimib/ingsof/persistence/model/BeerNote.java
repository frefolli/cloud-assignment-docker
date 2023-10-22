package unimib.ingsof.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class BeerNote {
	
	@Id
	private String noteID;
	private String beerID;
	private String noteType;
	private String description;
	
	public BeerNote() {
		super();
	}

	public BeerNote(String noteID, String beerID, String noteType, String description) {
		super();
		this.noteID = noteID;
		this.beerID = beerID;
		this.noteType = noteType;
		this.description = description;
	}
	
	public String getNoteID() {
		return noteID;
	}
	public void setNoteID(String noteID) {
		this.noteID = noteID;
	}
	public String getBeerID() {
		return beerID;
	}
	public void setBeerID(String beerID) {
		this.beerID = beerID;
	}
	public String getNoteType() {
		return noteType;
	}
	public void setNoteType(String noteType) {
		this.noteType = noteType;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
