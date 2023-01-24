package unimib.ingsof;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("unimib.ingsof.model")
@EntityScan("unimib.ingsof.model")
@ComponentScan("unimib.ingsof")
public class Application {
	
	@SuppressWarnings("unused")
	@Autowired
	private Initializr initializr;
	
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
