dev: venv
	yarn run debug

test: venv
	yarn test:nowatch src --coverage
	pre-commit run --all-files

coveralls:
	./node_modules/.bin/coveralls < coverage/lcov.info

travis: test coveralls

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
