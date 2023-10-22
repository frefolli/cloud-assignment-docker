package unimib.ingsof.generation.id;

import java.util.Map;

public class IDGenerator {
	public String generateID(Map<String, String> seed) {
		return postprocess(compute(preprocess(seed)));
	}
	
	protected String preprocess(Map<String, String> seed) {
		return seed.toString();
	}
	
	protected String compute(String seed) {
		return seed;
	}
	
	protected String postprocess(String id) {
		return id;
	}
}