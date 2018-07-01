run:
	python run.py

test:
	python setup.py test

coverage:
	coverage run --source=markote setup.py test

lint:
	pycodestyle . --exclude=venv && npm run lint
