package unimib.ingsof.persistence.service;
import java.util.List;

public class Protocol {
	public static final String NAME_BODY_KEY = "name";
	public static final String QUANTITY_BODY_KEY = "quantity";
	public static final String RECIPE_ID_BODY_KEY = "recipeID";
	public static final String DESCRIPTION_BODY_KEY = "description";
	public static final String NOTETYPE_BODY_KEY = "noteType";	
	
	public static final String RECIPE_ID_HEADER_KEY = "recipeID";
	public static final String BEER_ID_HEADER_KEY = "beerID";
	public static final String NOTE_ID_HEADER_KEY = "noteID";
	public static final String INGREDIENT_ID_HEADER_KEY = "ingredientID";
	public static final String SETTING_ID_HEADER_KEY = "settingID";

	public static final String SETTING_ID_BODY_KEY = "settingID";
	public static final String VALUE_BODY_KEY = "value";
	public static final String DEFAULT_EQUIPMENT = "30";
	public static final String EQUIPMENT_SETTING_ID = "equipment";
	
	public static final String DEFAULT_NOTETYPE = "generic";
	public static final List<String> NOTETYPES = List.of(DEFAULT_NOTETYPE, "taste", "problem");

	Protocol() {
	    throw new IllegalStateException("Utility class");
	}
}
