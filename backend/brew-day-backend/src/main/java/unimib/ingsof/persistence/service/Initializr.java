package unimib.ingsof.persistence.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.persistence.repository.IngredientRepository;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;

@Service
public class Initializr {
	@Autowired
	private RecipeRepository recipesRepo;
	@Autowired
	private RecipeIngredientRepository recIngredientsRepo;
    @Autowired
	private InventoryIngredientRepository invIngredientsRepo;
    @Autowired
	private IngredientRepository ingredientsRepo;
    @Autowired
	private BeerRepository beerRepo;
    @Autowired
	private BeerNoteRepository beerNoteRepo;
	
	@PostConstruct 
	public void init() {
		ingredientsRepo.assure();
		invIngredientsRepo.assure();
		recipesRepo.assure();
		recIngredientsRepo.assure();
		beerRepo.assure();
		beerNoteRepo.assure();
		
	}
}