########################################################################
FROM debian:bookworm as web_builder
# Install builder generic dependencies
RUN apt-get update && apt-get install -y wget tar gzip maven openjdk-17-jdk
# Download sources
RUN wget https://github.com/frefolli/cloud-assignment-docker/archive/refs/heads/master.tar.gz
RUN tar xvf master.tar.gz
RUN mv cloud-assignment-docker-master /sources
RUN rm master.tar.gz
# Build backend jar
WORKDIR /sources
ENV MAVEN_CLI_OPTS="-C --threads 1C --batch-mode -Dmaven.repo.local=.m2/repository"
RUN mvn $MAVEN_CLI_OPTS package -Dskip.lint -Dskip.test
########################################################################
FROM debian:bookworm as web_image
# Install image specific dependencies
RUN apt-get update && apt-get install -y openjdk-17-jre
COPY --from=web_builder /sources/backend/target/backend-1.0.0.jar /app/backend.jar
CMD ["java", "-jar", "/app/backend.jar"]
########################################################################
