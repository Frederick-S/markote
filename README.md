# Markote - Save markdown notes to OneNote (WIP)
[![Build Status](https://travis-ci.org/Frederick-S/markote.svg?branch=master)](https://travis-ci.org/Frederick-S/markote) [![Build status](https://ci.appveyor.com/api/projects/status/w6f5wr4vn4lublch/branch/master?svg=true)](https://ci.appveyor.com/project/Frederick-S/markote/branch/master) [![codecov](https://codecov.io/gh/Frederick-S/markote/branch/master/graph/badge.svg)](https://codecov.io/gh/Frederick-S/markote) [![Code Health](https://landscape.io/github/Frederick-S/markote/master/landscape.svg?style=flat)](https://landscape.io/github/Frederick-S/markote/master) [![codebeat badge](https://codebeat.co/badges/44e3e0d4-9f45-4828-b840-7b3d03214a53)](https://codebeat.co/projects/github-com-frederick-s-markote-master)

## Supported markdown syntax
* Heading
* Bold
* Italic
* Strikethrough
* Quoting code
* Quoting text
* List
* Link
* Image
* Table

## Known issues
* The left borders of blockquotes are removed

## Development
### Register your app
1. Navigate to the [Application Registration Portal](https://identity.microsoft.com/Landing) and sign in
2. Click `Add an app` and name your app
3. Set a platform by clicking `Add Platform`, select `Web`, and add a `Redirect URL` of `http://localhost:5000/login/authorized`
4. Click `Generate New Password` and store it securely
5. Add `Notes.Create`, `Notes.Read`, `User.Read` to `Delegated Permissions`

### Run from source code
1. Install [Cairo](https://cairographics.org/). For Windows users, you can also download standalone [Cairo dlls](https://github.com/preshing/cairo-windows/releases) and add its path to `PATH` environment variable
2. Clone the code
3. Add your own `Application Id` and `Application secret` to `config.py` or add them as environment variables
4. Run `npm install && npm run build`
5. Create an isolated Python environment and run `python setup.py install` in it
6. Run `python run.py` to start the app
7. Navigate to `http://localhost:5000/`

## Deployment
### Ubuntu 18.04 LTS
1. Install [nginx](https://www.nginx.com/)

    ```
    apt install nginx
    ```
2. Install [gunicorn](http://gunicorn.org/)
    
    ```
    pip3 install gunicorn
    ```
3. Install [cairo](https://cairographics.org/)

    ```
    apt install libcairo2-dev
    ```
4. Install [Node.js](https://nodejs.org/en/)
    
    ```
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
5. Clone the code
    
    ```
    git clone https://github.com/Frederick-S/markote.git
    ```
6. Install

    ```
    python3 setup.py install
    npm install
    npm run build
    ```
7. Add `GRAPH_CLIENT_ID` and `GRAPH_CLIENT_SECRET` to environment variables
8. Run the app
    
    ```
    gunicorn -c gunicorn.py wsgi:app &
    ```
9. Install [certbot](https://certbot.eff.org/)
10. Create `markote.conf` under `/etc/nginx/conf.d` with the following content:

    ```
    server {
        listen 443 ssl default_server;
        server_name yourdomain.com;
        ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

        location / {
            proxy_pass http://localhost:5000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```
11. Restart `nginx`

## License
[MIT](LICENSE)
