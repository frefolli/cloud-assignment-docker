# Build

root progetto + mvn compile

# Verify

- spotbugs
- checkstyle
- valgrind
- *sonarqube

# Unit Test

- Backend
  - test del modello e della view
  - generations
  - gateway
- Frontend
  - tutti

# Integration Test

- Backend
  - api/*

# Package

root progetto + mvn package

# Docker

Gitlab Registry < Dockerfile < jar

- docker run

# Docs

- Backend
 - javadoc
- Frontend
  - *jsdoc
  - *yuidoc
