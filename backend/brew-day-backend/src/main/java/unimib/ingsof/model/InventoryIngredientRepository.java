package unimib.ingsof.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface InventoryIngredientRepository extends CrudRepository<InventoryIngredient, String>{
	
	@Query(value = "SELECT * FROM inventory_ingredient", nativeQuery = true )
	ArrayList<InventoryIngredient> getAllIngredients();
	
	@Modifying 
	@Transactional
	@Query("INSERT INTO InventoryIngredient (name, quantity) VALUES (:name, :quantity)")
	void addIngredient(@Param("name") String name, @Param("quantity") float quantity);
	
	@Modifying 	
	@Transactional
	@Query("DELETE FROM InventoryIngredient WHERE name=:name")
	void deleteIngredient(@Param("name") String name);
	
	@Modifying 
	@Transactional
	@Query(value = "UPDATE inventory_ingredient SET name = :newName, quantity = :quantity WHERE name = :oldName RETURNING *", nativeQuery = true)
	ArrayList<InventoryIngredient> updateIngredient(@Param("oldName") String oldName, @Param("newName") String newName, @Param("quantity") float quantity);
	
	@Query(value = "SELECT * FROM inventory_ingredient WHERE name=:name", nativeQuery = true )
	ArrayList<InventoryIngredient> getIngredientById(@Param("name") String name);

	@Modifying 
	@Transactional
	@Query(value = "DROP TABLE IF EXISTS inventory_ingredient; CREATE table IF NOT EXISTS inventory_ingredient (name varchar(10) primary key, quantity real)", nativeQuery=true)
	void rebase();
	
	@Modifying 
	@Transactional
	@Query(value = "CREATE TABLE IF NOT EXISTS inventory_ingredient (name varchar(10) primary key, quantity real)", nativeQuery=true)
	public void assure();
}
