package unimib.ingsof.persistence.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import unimib.ingsof.persistence.model.Beer;

@Repository
public interface BeerRepository extends CrudRepository<Beer, String> {
    // GET
	@Query(value = "SELECT beerID FROM beer WHERE (name LIKE %:name%) AND ((recipeID IS null AND '' LIKE %:recipeID%) OR (recipeID LIKE %:recipeID%))", nativeQuery = true)
	ArrayList<String> getAllBeerIDs(@Param("name") String name, @Param("recipeID") String recipeID);
    
    // GET
    @Query(value = "SELECT * FROM beer WHERE beerID = :beerID", nativeQuery = true)
    Beer getBeer(@Param("beerID") String beerID);
    
    // POST
    @Modifying
    @Query("INSERT INTO Beer (beerID, name, recipeID) values (:beerID, :name, :recipeID)")
    @Transactional
    void addBeer(@Param("beerID") String beerID, @Param("name") String name, @Param("recipeID") String recipeID);

    // DELETE
    @Modifying
    @Query("DELETE FROM Beer WHERE beerID = :beerID")
    @Transactional
    void deleteBeer(@Param("beerID") String beerID);

    // PUT
    @Modifying
    @Query(value = "UPDATE beer SET name = :name WHERE beerID = :beerID RETURNING *", nativeQuery = true)
    @Transactional
	ArrayList<Beer> updateBeer(@Param("beerID") String beerID, @Param("name") String name);

    // ASSURE
    @Modifying
    @Query(value = "create table if not exists beer (beerID TEXT primary key, name TEXT NOT NULL, recipeID TEXT, FOREIGN KEY (recipeID) REFERENCES recipe(recipeID) ON DELETE SET NULL)", nativeQuery = true)
    @Transactional
	void assure();

    // REBASE
    @Modifying
    @Query(value = "drop table if exists beer", nativeQuery = true)
    @Transactional
	void drop();

    // PUT
    @Modifying
    @Query(value = "UPDATE beer SET recipeID = NULL WHERE recipeID = :recipeID RETURNING *", nativeQuery = true)
    @Transactional
	ArrayList<Beer> removeRecipe(@Param("recipeID") String recipeID);
}
