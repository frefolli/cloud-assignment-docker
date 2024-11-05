# Assignment on Containerization with Docker (sucks!!! w chroot anyway)

The `brewday-web` subdirectory contains a Dockerfile for building the brewday-web service.
Anyway this can be built using `docker-compose build` since it specifies this subdirectory as target for building its image.
The `brewday-web` Spring api server listens to port 8080.
Visiting `http://localhost:8080` should be sufficient to test connections in all the App since the homepage uses some APIs to retrieve trivial information (user preferences ... and the advice availability I think).

## Utils

To run a local registry (from my laptop) I need to run `docker run -d -p 5000:5000 --name registry registry`.
Then I open a reverse SSH Tunnel for port 5000 on the Cloud VM and push those images into my local registry.
The I could deploy those images on my machine on the Cloud VM with docker-compose.
