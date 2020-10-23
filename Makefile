dev: venv
	yarn run debug

test: venv
	yarn test:nowatch src --coverage
	pre-commit run --all-files

coverage:
	./node_modules/.bin/coveralls < coverage/lcov.info

lint: venv
	./node_modules/.bin/eslint src --fix

venv:
	virtualenv -p python3 venv
	. venv/bin/activate
	pip install -r requirements.txt
	pre-commit install
	yarn install

clean:
	rm -rf node_modules
	rm -rf venv
