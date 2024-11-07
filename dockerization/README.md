# Assignment on Containerization with Docker

Assignment of Refolli Francesco. 865955.

The `brewday-web` subdirectory contains a Dockerfile for building the brewday-web service, but this will be built by `docker-compose build` since it specifies this subdirectory as target for building its image.
The Dockerfile specifies two containers: a Builder service in order to compile React and Java SpringBoot, a Web service which holds the jar file produced by the Builder.
Since the sources of the application is huge (~80 MB) due to metadata of the exams (and a beautiful background of 12MB), this directory contains only a `docker-compose.yml` and a `Dockerfile`.
The latter will download the sources from GitHub inside the Builder container.

Some environment variables should be defined in order to docker-compose build and run correctly the system:
| Name | Description | Value |
| ---- | ----------- | ----- |
| POSTGRES_DB_USERNAME | The Postgres DB owner's username | 'postgres' |
| POSTGRES_DB_PASSWORD | The Postgres DB owner's password | 'postgres' |
| POSTGRES_DB_URL | The Postgres DB url | 'jdbc:postgresql:brewdaydb' |
| BACKEND_PORT | The Port to be used internally by the backend | 8080 |

Those can be acquired sourcing the `env.sh` file.

The `brewday-web` Spring API server listens to port 8080 (exported through docker-compose).
Visiting `http://localhost:8080` should be sufficient to test connections in the App since the homepage uses some APIs to retrieve trivial information (user preferences, recommendation and schedule).
