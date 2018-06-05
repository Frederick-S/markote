run:
	python manage.py runserver

test:
	python setup.py test

coverage:
	coverage run --source=markote setup.py test

lint:
	pycodestyle . --exclude=venv && npm run lint
