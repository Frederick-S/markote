FROM python:3.6-slim

WORKDIR /app

ADD . /app

RUN apt update
RUN apt install -y curl sudo gnupg libcairo2-dev
RUN pip install gunicorn
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

RUN python setup.py install
RUN npm install
RUN npm run build

EXPOSE 5000

CMD [ "gunicorn", "-c", "gunicorn.py", "wsgi:app" ]