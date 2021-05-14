include .env

.PHONY: up
up:
		docker-compose up -d

.PHONY: force
force:
		docker-compose up --force-recreate --build -d

.PHONY: down
down:
		docker-compose down

.PHONY: down
logs:
		docker-compose logs -f
