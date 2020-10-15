dev: venv
	yarn run debug

test: venv
	pre-commit run --all-files

venv:
	virtualenv -p python3 venv
	. venv/bin/activate
	pip install -r requirements.txt
	pre-commit install
	yarn install

clean:
	rm -rf node_modules
	rm -rf venv
