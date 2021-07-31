start:
	yarn workspace $${name:-server} start

up:
	@docker-compose up -d

down:
	@docker-compose down
