start:
	yarn workspace $${name:-server} start

up:
	@docker-compose up -d

down:
	@docker-compose down

dashboard:
	@open http://localhost:8081
