########################################################################
FROM debian:bookworm as builder_base
# Install builder generic dependencies
RUN sudo apt install -y wget tar gzip
# Download sources
RUN wget https://github.com/frefolli/cloud-assignment-docker/archive/refs/heads/master.tar.gz
RUN tar xvf master.tar.gz
RUN mv cloud-assignment-docker-master /sources
RUN rm master.tar.gz
########################################################################
FROM builder_base as backend_builder
# Install builder specific dependencies
RUN sudo apt install -y maven openjdk-17-jdk
WORKDIR /sources/backend
# Build backend jar
ENV MAVEN_CLI_OPTS="-C --threads 1C --batch-mode -Dmaven.repo.local=.m2/repository"
RUN mvn $MAVEN_CLI_OPTS -pl backend
########################################################################
FROM builder_base as frontend_builder
# Install builder specific dependencies
RUN sudo apt install -y yarnpkg
WORKDIR /sources/frontend
# Build frontend dist
RUN npm run build
########################################################################
FROM <IMAGE> as backend_image
########################################################################
FROM <IMAGE> as frontend_image
########################################################################
