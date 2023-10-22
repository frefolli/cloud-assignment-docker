package unimib.ingsof.persistence.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import unimib.ingsof.persistence.model.BeerNote;

@Repository
public interface BeerNoteRepository extends CrudRepository<BeerNote, String> {
    // Get
	@Query("SELECT new BeerNote(noteID, beerID, noteType, description) FROM BeerNote WHERE beerID = :beerID")
    ArrayList<BeerNote> getAll(@Param("beerID") String beerID);
    
	// Get
	@Query(value = "SELECT * FROM beer_note WHERE beerID = :beerID AND noteID = :noteID", nativeQuery = true)
	BeerNote getNote(@Param("beerID") String beerID, @Param("noteID") String noteID);
	
	// POST
    @Modifying
    @Transactional
    @Query("INSERT INTO BeerNote (beerID, noteID, noteType, description) values (:beerID, :noteID, :noteType, :description)")
    void addNote(@Param("beerID") String beerID, @Param("noteID") String noteID,  @Param("noteType") String noteType, @Param("description") String description);

	// PUT
    @Modifying
    @Transactional
    @Query(value = "UPDATE beer_note set note_type = :noteType WHERE beerID = :beerID AND noteID = :noteID RETURNING *", nativeQuery = true)
    ArrayList<BeerNote> updateNoteType(@Param("beerID") String beerID, @Param("noteID") String noteID, @Param("noteType") String noteType);

	// PUT
    @Modifying
    @Transactional
    @Query(value = "UPDATE beer_note set description = :description WHERE beerID = :beerID AND noteID = :noteID RETURNING *", nativeQuery = true)
    ArrayList<BeerNote> updateNoteDescription(@Param("beerID") String beerID, @Param("noteID") String noteID, @Param("description") String description);
    
    // DELETE
    @Modifying
    @Transactional
    @Query("DELETE FROM BeerNote WHERE beerID = :beerID AND noteID = :noteID")
    void deleteNote(@Param("beerID") String beerID, @Param("noteID") String noteID);

    // ASSURE
    @Modifying
    @Transactional
    @Query(value = "create table if not exists beer_note (noteID TEXT NOT NULL PRIMARY KEY, beerID TEXT NOT NULL, note_type TEXT NOT NULL, description TEXT NOT NULL, FOREIGN KEY (beerID) REFERENCES beer(beerID) ON DELETE CASCADE)", nativeQuery = true)
	void assure();

    // REBASE
    @Modifying
    @Transactional
    @Query(value = "drop table if exists beer_note", nativeQuery = true)
	void drop();
}