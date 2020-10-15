dev: venv
	yarn run debug

test: venv
	pre-commit run --all-files

venv:
	virtualenv -p python3 venv
	. venv/bin/activate
	pip install -r requirements.txt
	pre-commit install
	# TODO remove --ignore-engines and figure out why it fails without on Travis
	yarn install --ignore-engines

clean:
	rm -rf node_modules
	rm -rf venv
