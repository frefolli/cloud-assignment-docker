package unimib.ingsof.persistence.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import unimib.ingsof.persistence.model.Ingredient;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, String>{
	
	@Query(value = "SELECT * FROM ingredient", nativeQuery = true )
	ArrayList<Ingredient> getAll();
	
	@Query(value = "SELECT * FROM ingredient WHERE ingredientID=:ingredientID", nativeQuery = true )
	Ingredient getIngredient(@Param("ingredientID") String ingredientID);
	
	@Query(value = "SELECT * FROM ingredient WHERE name=:name", nativeQuery = true )
	Ingredient getIngredientByName(@Param("name") String name);
	
	@Modifying 
	@Transactional
	@Query("INSERT INTO Ingredient (ingredientID, name) VALUES (:ingredientID, :name)")
	void addIngredient(@Param("ingredientID") String ingredientID, @Param("name") String name);
	
	@Modifying 	
	@Transactional
	@Query("DELETE FROM Ingredient WHERE ingredientID=:ingredientID")
	void deleteIngredient(@Param("ingredientID") String ingredientID);
	
	@Modifying 
	@Transactional
	@Query(value = "CREATE TABLE IF NOT EXISTS ingredient (ingredientID TEXT, name TEXT NOT NULL UNIQUE, PRIMARY KEY(ingredientID))", nativeQuery=true)
	public void assure();
	
	@Modifying 
	@Transactional
	@Query(value = "DROP TABLE IF EXISTS ingredient", nativeQuery=true)
	void drop();

}
