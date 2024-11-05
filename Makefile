@all:
	mvn clean
	mvn compile -pl frontend -Dskip.lint -Dskip.test
	mvn compile -pl backend -Dskip.lint -Dskip.test
	mvn package -Dskip.lint -Dskip.test
	java -jar backend/target/backend-*.jar
