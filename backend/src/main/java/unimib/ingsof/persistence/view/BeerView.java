package unimib.ingsof.persistence.view;

import java.util.List;

import unimib.ingsof.persistence.model.BeerNote;

public class BeerView extends BeerDetailsView {
	private List<BeerNote> notes;

	public BeerView() {
		super();
	}

	public BeerView(String beerID, String name, String recipeID, List<BeerNote> notes) {
		super(beerID, name, recipeID);
		this.notes = notes;
	}

	public List<BeerNote> getNotes() {
		return notes;
	}

	public void setNotes(List<BeerNote> result) {
		this.notes = result;
	}
}
