run:
	python manage.py runserver

test:
	python manage.py test

coverage:
	coverage run --source=markote manage.py test

lint:
	pycodestyle . --exclude=venv && npm run lint
