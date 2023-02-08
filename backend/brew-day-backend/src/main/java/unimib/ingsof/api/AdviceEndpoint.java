package unimib.ingsof.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.logic.AdviceController;
import unimib.ingsof.persistence.view.AdviceView;

@RestController
@RequestMapping("/api/advice")
public class AdviceEndpoint {
	
	@Autowired
	private AdviceController adviceController;

	@GetMapping
	public ResponseEntity<AdviceView> getRecipeAdvice() throws InternalServerException {
		try {
			AdviceView recipe = this.adviceController.getAdvice();
			return new ResponseEntity<>(recipe, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND );
		}
	}
}
