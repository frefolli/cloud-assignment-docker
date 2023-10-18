FROM openjdk:17
COPY backend/target/backend-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080
