# Assignment on Containerization with Docker

The `brewday-web` subdirectory contains a Dockerfile for building the brewday-web service.
Anyway this can be built using `docker-compose build` since it specifies this subdirectory as target for building its image.
The `brewday-web` Spring api server listens to port 8080.
Visiting `http://localhost:8080` should be sufficient to test connections in all the App since the homepage uses some APIs to retrieve trivial information (user preferences ... and the advice availability I think).

Some enviroment variables should be defined in order to docker-compose build and run correctly the system:
| Name | Description | Value |
| ---- | ----------- | ----- |
| POSTGRES_DB_USERNAME | The Postgres DB owner's username | 'postgres' |
| POSTGRES_DB_PASSWORD | The Postgres DB owner's password | 'postgres' |
| POSTGRES_DB_URL | The Postgres DB url | 'jdbc:postgresql:brewdaydb' |
| BACKEND_PORT | The Port to be used internally by the backend | 8080 |
