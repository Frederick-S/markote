run:
	python3 manage.py runserver

test:
	python3 manage.py test

coverage:
	coverage run --source=onemark manage.py test