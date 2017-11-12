run:
	python3 manage.py runserver -h 0.0.0.0 -p 8080

test:
	python3 manage.py test

coverage:
	coverage run --source=onemark manage.py test