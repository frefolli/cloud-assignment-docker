package unimib.ingsof.persistence.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import unimib.ingsof.persistence.model.RecipeIngredient;

@Repository
public interface RecipeIngredientRepository extends CrudRepository<RecipeIngredient, String> {
    // Get
	@Query("SELECT new RecipeIngredient(recipeID, ingredientID, quantity) FROM RecipeIngredient WHERE recipeID = :recipeID")
    ArrayList<RecipeIngredient> getAll(@Param("recipeID") String recipeID);
    
	// Get
	@Query(value = "SELECT * FROM recipe_ingredient WHERE recipeID = :recipeID AND ingredientID = :ingredientID", nativeQuery = true)
	RecipeIngredient getIngredient(@Param("recipeID") String recipeID, @Param("ingredientID") String ingredientID);
	
	// POST
    @Modifying
    @Transactional
    @Query("INSERT INTO RecipeIngredient (recipeID, ingredientID, quantity) values (:recipeID, :ingredientID, :quantity)")
    void addIngredient(@Param("recipeID") String recipeID, @Param("ingredientID") String ingredientID, @Param("quantity") float quantity);

	// PUT
    @Modifying
    @Transactional
    @Query(value = "UPDATE recipe_ingredient set quantity = :quantity WHERE recipeID = :recipeID AND ingredientID = :ingredientID RETURNING *", nativeQuery = true)
    ArrayList<RecipeIngredient> updateIngredient(@Param("recipeID") String recipeID, @Param("ingredientID") String ingredientID, @Param("quantity") float quantity);
    
    // DELETE
    @Modifying
    @Transactional
    @Query("DELETE FROM RecipeIngredient WHERE recipeID = :recipeID AND ingredientID = :ingredientID")
    void deleteIngredient(@Param("recipeID") String recipeID, @Param("ingredientID") String ingredientID);

    // ASSURE
    @Modifying
    @Transactional
    @Query(value = "create table if not exists recipe_ingredient (ingredientID TEXT NOT NULL, recipeID TEXT NOT NULL, quantity REAL NOT NULL, FOREIGN KEY (recipeID) REFERENCES recipe(recipeID) ON DELETE CASCADE, FOREIGN KEY (ingredientID) REFERENCES ingredient(ingredientID), PRIMARY KEY (recipeID, ingredientID))", nativeQuery = true)
	void assure();

    // REBASE
    @Modifying
    @Transactional
    @Query(value = "drop table if exists recipe_ingredient", nativeQuery = true)
	void drop();
}