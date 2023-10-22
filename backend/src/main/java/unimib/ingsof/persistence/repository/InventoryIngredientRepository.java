package unimib.ingsof.persistence.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import unimib.ingsof.persistence.model.InventoryIngredient;

@Repository
public interface InventoryIngredientRepository extends CrudRepository<InventoryIngredient, String>{
	// GET
	@Query("SELECT new InventoryIngredient(I.ingredientID, quantity) FROM InventoryIngredient AS II LEFT JOIN Ingredient AS I ON I.ingredientID = II.ingredientID ")
	ArrayList<InventoryIngredient> getAll();

	// GET
	@Query(value = "SELECT * FROM inventory_ingredient WHERE ingredientID=:ingredientID", nativeQuery = true)
	InventoryIngredient getIngredient(@Param("ingredientID") String ingredientID);
	
	// POST
	@Modifying 
	@Transactional
	@Query("INSERT INTO InventoryIngredient (ingredientID, quantity) VALUES (:ingredientID, :quantity)")
	void addIngredient(@Param("ingredientID") String ingredientID, @Param("quantity") float quantity);

	// DELETE
	@Modifying 	
	@Transactional
	@Query("DELETE FROM InventoryIngredient WHERE ingredientID=:ingredientID")
	void deleteIngredient(@Param("ingredientID") String ingredientID);

	// PUT
	@Modifying 
	@Transactional
	@Query(value = "UPDATE inventory_ingredient SET quantity = :quantity WHERE ingredientID = :ingredientID RETURNING *", nativeQuery = true)
	ArrayList<InventoryIngredient> updateIngredient(@Param("ingredientID") String ingredientID, @Param("quantity") float quantity);

	@Modifying 
	@Transactional
	@Query(value = "CREATE TABLE IF NOT EXISTS inventory_ingredient (ingredientID TEXT NOT NULL PRIMARY KEY, quantity REAL NOT NULL, FOREIGN KEY (ingredientID) REFERENCES ingredient(ingredientID))", nativeQuery=true)
	public void assure();
	
	@Modifying 
	@Transactional
	@Query(value = "DROP TABLE IF EXISTS inventory_ingredient", nativeQuery=true)
	void drop();
}
