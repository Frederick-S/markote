FROM python:3.6-slim

WORKDIR /app
ADD . /app

RUN apt-get update && apt-get install curl gnupg libcairo2-dev -y --no-install-recommends
RUN pip install gunicorn
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install nodejs -y --no-install-recommends

RUN python setup.py install
RUN npm install
RUN npm run build

EXPOSE 5000

CMD ["gunicorn", "-c", "gunicorn.py", "wsgi:app"]
