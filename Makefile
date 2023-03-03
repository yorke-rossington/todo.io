setup: install db run

install:
	npm i

db:
	docker compose up -d --build --wait

run:
	npm run dev

unit-test:
	cd ui && npm run test:unit -- --run

e2e-test:
	npx cypress run
