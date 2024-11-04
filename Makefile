@all:
	docker build . --target backend_image -t brewday-backend
	docker build . --target frontend_image -t brewday-frontend
	docker-compose build
