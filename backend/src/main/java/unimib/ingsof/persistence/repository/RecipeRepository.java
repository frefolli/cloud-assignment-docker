package unimib.ingsof.persistence.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import unimib.ingsof.persistence.model.Recipe;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, String> {
    // GET
    @Query("SELECT recipeID FROM Recipe WHERE name like %:name%")
    ArrayList<String> getAllRecipeIDsByName(@Param("name") String name);
    
    // GET
    @Query(value = "SELECT * FROM recipe WHERE recipeID = :recipeID", nativeQuery = true)
    Recipe getRecipe(@Param("recipeID") String recipeID);
    
    // POST
    @Modifying
    @Query("INSERT INTO Recipe (recipeID, name, description) values (:recipeID, :name, :description)")
    @Transactional
    void addRecipe(@Param("recipeID") String recipeID, @Param("name") String name, @Param("description") String description);

    // DELETE
    @Modifying
    @Query("DELETE FROM Recipe WHERE recipeID = :recipeID")
    @Transactional
    void deleteRecipe(@Param("recipeID") String recipeID);

    // PUT
    @Modifying
    @Query(value = "UPDATE recipe SET name = :name WHERE recipeID = :recipeID RETURNING *", nativeQuery = true)
    @Transactional
	ArrayList<Recipe> updateRecipeName(@Param("recipeID") String recipeID, @Param("name") String name);

    // PUT
    @Modifying
    @Query(value = "UPDATE recipe SET description = :description WHERE recipeID = :recipeID RETURNING *", nativeQuery = true)
    @Transactional
	ArrayList<Recipe> updateRecipeDescription(@Param("recipeID") String recipeID, @Param("description") String name);

    // ASSURE
    @Modifying
    @Query(value = "create table if not exists recipe (recipeID TEXT primary key, name TEXT NOT NULL, description TEXT NOT NULL)", nativeQuery = true)
    @Transactional
	void assure();

    // REBASE
    @Modifying
    @Query(value = "drop table if exists recipe", nativeQuery = true)
    @Transactional
	void drop();
}
