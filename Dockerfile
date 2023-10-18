
#nota: amazoncorretto ha già dentro di sé sqlite.
# amazoncorretto implementa openjdk
FROM amazoncorretto:17
#copio il jar dentro l'immagine'
COPY backend/target/backend-1.0.0.jar app.jar
#imposto l'entrypoint del container
ENTRYPOINT ["java","-jar","/app.jar"]
#il server gira sulla 8080, nota che serve fare il bind della porta 8080 del container con la macchina host per accedere ai servizi del server, non basta l'expose di qui sotto.
EXPOSE 8080
