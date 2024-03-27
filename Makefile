# .env.public for common environment variables
ENV_FILE = $(shell [ -e ".env" ] && echo ".env" || echo ".env.public")

include $(ENV_FILE)

.DEFAULT_GOAL := help # when you run make, it defaults to printing available commands

LOCAL_APP_FOLDER  = /usr/src/app

DB_URL     = mongodb://mongoDev:Passw0rd@localhost:27017/?authSource=admin
DEFAULT_DB = mongodb
TOKEN_SCRIPT_FILE	= scripts/firebase-auth-test

# Available platforms: linux/amd64 | linux/arm64/v8 | linux/x86_64
PLATFORM = linux/x86_64

ifeq ($(OS),Windows_NT)
	DIR := $(shell powershell "(New-Object -ComObject Scripting.FileSystemObject).GetFolder('.').ShortPath")
else
	DIR := "$$(pwd)"
endif

# include dependencies and codebase to a container excluding local dependencies that could conflict with one from volumes
DEV_VOLUMES = \
	-v $(DIR):$(LOCAL_APP_FOLDER) \
	-v $(LOCAL_APP_FOLDER)/node_modules \
	-v $(COMPOSE_PROJECT_NAME)-backend-packages:$(LOCAL_APP_FOLDER)/node_modules

.PHONY: docker-clean
docker-clean: ## stop+kill all running containers. prune stopped containers. remove all untagged images
ifeq ($(OS),Windows_NT)
	powershell "docker ps -qa | foreach-object {docker kill $$_}; docker container prune --force; docker system prune --force;"
else
	docker ps -qa | xargs docker kill; docker container prune --force; docker system prune --force;
endif

.PHONY: build-dev
build-dev: ## build container image
	docker build -t $(COMPOSE_PROJECT_NAME)-dev --target development --platform $(PLATFORM) .

.PHONY: install-packages
install-packages: ## install node packages for api dev server into volume
	docker run -t --workdir="$(LOCAL_APP_FOLDER)" $(DEV_VOLUMES) \
		--platform $(PLATFORM) \
		$(COMPOSE_PROJECT_NAME)-dev /bin/ash -ci "yarn install"

.PHONY: build-prod
build-prod: ## build container image
	docker build -t $(COMPOSE_PROJECT_NAME) --platform $(PLATFORM) .

.PHONY: get-token
get-token: ## Retrieve an access token for admin or user roles [ROLE=admin|ROLE=user]
	node $(TOKEN_SCRIPT_FILE) $(ROLE)

.PHONY: interactive
interactive: ## run the api standalone only for healthcheck and no db connection
	docker run -it --workdir="$(LOCAL_APP_FOLDER)" \
		--platform $(PLATFORM) \
		$(DEV_VOLUMES) \
		-p "5002:5002" \
		$(COMPOSE_PROJECT_NAME)-dev:latest /bin/ash

.PHONY: launch-db
launch-db: docker-clean ## launch db container on local machine
	docker-compose --env-file $(ENV_FILE) -f docker-compose/docker-compose.yml up

.PHONY: launch-local
launch-local: docker-clean ## launch the multi-container on local machine
	docker-compose --env-file $(ENV_FILE) -f docker-compose/docker-compose.local.yml up

.PHONY: launch-prod
launch-prod: docker-clean build-prod ## launch the multi-container on local machine
	docker-compose --env-file $(ENV_FILE) -f docker-compose/docker-compose.prod.yml up

.PHONY: stop-db
stop-db: ## locally stop all containers for local development
	docker-compose --env-file=$(ENV_FILE) -f docker-compose/docker-compose.yml down

.PHONY: stop-local
stop-local: ## locally stop all containers for local development
	docker-compose --env-file=$(ENV_FILE) -f docker-compose/docker-compose.local.yml down

.PHONY: stop-prod
stop-prod: ## locally stop all containers for production
	docker-compose --env-file=$(ENV_FILE) -f docker-compose/docker-compose.prod.yml down

.PHONY: help
help:  ## show all make commands
ifeq ($(OS),Windows_NT)
	powershell "((type Makefile) -match '##') -notmatch 'grep'"
else
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
endif
