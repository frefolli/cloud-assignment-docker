package unimib.ingsof.generation.id;

import java.security.NoSuchAlgorithmException;
import java.util.Map;

import unimib.ingsof.exceptions.WrongIDGenerationInitialization;

public class IDGenerationFacade {
	private static IDGenerationFacade instance;
	private IDGenerator ingredientIDGenerator;
	private IDGenerator recipeIDGenerator;
	private IDGenerator beerIDGenerator;
	private IDGenerator noteIDGenerator;
	
	public static synchronized IDGenerationFacade getInstance() throws WrongIDGenerationInitialization {
		if (IDGenerationFacade.instance == null) {
			try {
				IDGenerationFacade.instance = IDGenerationFacade.newInstance();
			} catch(NoSuchAlgorithmException exception) {
				throw new WrongIDGenerationInitialization();
			}
		}
		return IDGenerationFacade.instance;
	}
	
	private static IDGenerationFacade newInstance() throws NoSuchAlgorithmException {
		return new IDGenerationFacade(
				new RandomSeedSHA256HashingGenerator(),
				new RandomSeedSHA256HashingGenerator(),
				new RandomSeedSHA256HashingGenerator(),
				new RandomSeedSHA256HashingGenerator()
		);
	}

	public IDGenerationFacade(IDGenerator ingredientIDGenerator, 
			IDGenerator recipeIDGenerator,
			IDGenerator beerIDGenerator,
			IDGenerator noteIDGenerator) {
		super();
		this.ingredientIDGenerator = ingredientIDGenerator;
		this.recipeIDGenerator = recipeIDGenerator;
		this.beerIDGenerator = beerIDGenerator;
		this.noteIDGenerator = noteIDGenerator;
	}
	
	public String generateIngredientID(Map<String, String> seed) {
		return this.ingredientIDGenerator.generateID(seed);
	}
	
	public String generateRecipeID(Map<String, String> seed) {
		return this.recipeIDGenerator.generateID(seed);
	}
	
	public String generateBeerID(Map<String, String> seed) {
		return this.beerIDGenerator.generateID(seed);
	}
	
	public String generateNoteID(Map<String, String> seed) {
		return this.noteIDGenerator.generateID(seed);
	}
}