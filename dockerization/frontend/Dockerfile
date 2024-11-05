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
FROM builder_base as frontend_builder
# Install builder specific dependencies
RUN apt-get install -y yarnpkg
WORKDIR /sources/frontend
# Build frontend dist
RUN yarnpkg
RUN yarnpkg run build
########################################################################
FROM nginx as frontend_image
# Install image specific dependencies
COPY --from=frontend_builder /sources/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
########################################################################
