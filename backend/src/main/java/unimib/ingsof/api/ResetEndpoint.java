package unimib.ingsof.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.logic.RepositoryResetController;

@RestController
@RequestMapping("/api/reset")
public class ResetEndpoint {
	@PostMapping
	public ResponseEntity<Object> doReset() throws ValidationException, AlreadyExistsException, DoesntExistsException {
		RepositoryResetController.getInstance().doReset();
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
