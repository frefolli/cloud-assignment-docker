# Assignment on Containerization with Docker (sucks!!! w chroot anyway)

The `frontend` subdirectory contains a Dockerfile for building the frontend.
The `backend` subdirectory contains a Dockerfile for building the backend.
Anyway these can be built using `docker-compose build` since it specifies those subdirectories as target for building their image.
The `frontend` nginx server listens to port 8080 (internally exposed as 80), while the `backend` Spring api server listens to port 3000 (internally exposed as 8080).
Visiting the `frontend` at `http://localhost:8080` should be sufficient to test connections in all the App since the homepage uses some APIs to retrieve trivial information (user preferences ... and the advice availability I think).

## Utils

To run a local registry (from my laptop) I need to run `docker run -d -p 5000:5000 --name registry registry`.
Then I open a reverse SSH Tunnel for port 5000 on the Cloud VM and push those images into my local registry.
The I could deploy those images on my machine on the Cloud VM with docker-compose.
