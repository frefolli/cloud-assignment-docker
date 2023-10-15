# Instructions for Developing and Running this software in UNIX-like environments (POSIX-compliant File Systems)

## Production build

`mvn clean package` from repository root directory.

## Production serve

After having compiled the production build, execute `java -jar backend/target/backend-1.0.0.jar` from root directory.

## Frontend-only build

`mvn clean package` or `npm run build` from `frontend` directory.

## Frontend-only serve

`npm run build` and then `serve -s build` (if previously installed `serve`: `npm install serve --global`) or `npm start` from `frontend` directory.

## Backend-only build

`mvn clean package` from `backend` directory.

Inserting the frontend compilation into the backend static directory will have the effect of creating the Production Build.

## Backend-only serve

Either start the project as a Java Application by Eclipse, or compile the project and then run the jar:

`mvn clean package` an then `java -jar target/backend-1.0.0.jar` from `backend` directory.
