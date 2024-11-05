########################################################################
FROM debian:bookworm as builder_base
# Install builder generic dependencies
RUN apt-get update && apt-get install -y wget tar gzip
# Download sources
RUN wget https://github.com/frefolli/cloud-assignment-docker/archive/refs/heads/master.tar.gz
RUN tar xvf master.tar.gz
RUN mv cloud-assignment-docker-master /sources
RUN rm master.tar.gz
########################################################################
FROM builder_base as backend_builder
# Install builder specific dependencies
RUN apt-get install -y maven openjdk-17-jdk sqlite3
WORKDIR /sources/backend
# Build backend jar
ENV MAVEN_CLI_OPTS="-C --threads 1C --batch-mode -Dmaven.repo.local=.m2/repository"
RUN mvn $MAVEN_CLI_OPTS package
########################################################################
FROM debian:bookworm as backend_image
# Install image specific dependencies
RUN apt-get update && apt-get install -y openjdk-17-jre sqlite3
COPY --from=backend_builder /sources/backend/target/backend-1.0.0.jar /app/backend.jar
CMD ["java", "-jar", "/app/backend.jar"]
EXPOSE 3000
########################################################################
