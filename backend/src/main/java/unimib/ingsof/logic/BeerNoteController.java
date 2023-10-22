package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.BeerNote;
import unimib.ingsof.persistence.repository.BeerNoteRepositoryGateway;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.validation.validators.BeerNoteUpdatingValidator;

@Service
public class BeerNoteController {
	private static BeerNoteController instance = null;
	public static BeerNoteController getInstance() {
		return BeerNoteController.instance;
	}
	public static void createInstance(BeerNoteController instance) {
		BeerNoteController.instance = instance;
	}
	
	public BeerNote getNote(String beerID, String noteID) throws DoesntExistsException {
		BeerNote beerNote = BeerNoteRepositoryGateway.getInstance().getNote(beerID, noteID);
		if (beerNote == null)
			throw new DoesntExistsException();
		return beerNote;
	}
	
	public BeerNote updateNote(String beerID, String noteID, Map<String, String> noteObject) throws ValidationException, DoesntExistsException {
		noteObject = BeerNoteUpdatingValidator.getInstance().handle(noteObject);
		String noteType = noteObject.get(Protocol.NOTETYPE_BODY_KEY);
		String description = noteObject.get(Protocol.DESCRIPTION_BODY_KEY);
		BeerNote beerNote = this.getNote(beerID, noteID);
		
		if (noteType != null) {
			BeerNoteRepositoryGateway.getInstance().updateNoteType(beerID, noteID, noteType);
			beerNote.setNoteType(noteType);
		}
		
		if (description != null) {
			BeerNoteRepositoryGateway.getInstance().updateNoteDescription(beerID, noteID, description);
			beerNote.setDescription(description);
		}
		
		return beerNote;
	}
	
	public void deleteNote(String beerID, String noteID) {
		BeerNoteRepositoryGateway.getInstance().deleteNote(beerID, noteID);
	}
}