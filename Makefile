run:
	python manage.py runserver

test:
	python manage.py test

coverage:
	coverage run --source=onemark manage.py test

lint:
    pycodestyle . --exclude=venv