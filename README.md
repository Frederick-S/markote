# Markote - Save markdown notes to OneNote
[![Build](https://github.com/Frederick-S/markote/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/Frederick-S/markote/actions/workflows/build.yml) [![codecov](https://codecov.io/gh/Frederick-S/markote/branch/master/graph/badge.svg)](https://codecov.io/gh/Frederick-S/markote)

## Features
* Markdown support
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
* Code highlighting using highlight.js
* LaTeX math equations using MathJax

## Known issues
* The left borders of blockquotes are removed

## Development
### Register your app
1. Log in to `Microsoft Azure`
2. Find `App registrations` under `All services`
3. Click `New registration`, select `Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)` under `Supported account types`, and add `http://localhost:5000/login/authorized` as `Redirect URI`
4. Click `Add a permission` to add `Files.ReadWrite`, `Notes.ReadWrite`, `User.Read`, `offline_access` under `API permissions > Microsoft Graph > Delegated permissions`
5. Click `New client secret` under `Certificates & secrets` and store it securely

### Run from source code
1. Install [Cairo](https://cairographics.org/)
2. Clone the code
3. Add your own `Application Id` and `Application secret` to `config.py` or add them as environment variables
4. Run `npm install && npm run build`
5. Create an isolated Python virtual environment and run `python setup.py install` in it
6. Run `python run.py` to start the app
7. Navigate to `http://localhost:5000/`

## Deployment
### Ubuntu 18.04 LTS
1. Run the app
   1. Run from docker
      1. Create an env file called `graph.key` with the following content:
         ```
         GRAPH_CLIENT_ID=your client id
         GRAPH_CLIENT_SECRET=your client secret
         ```
      2. Run `sudo docker run -d -p 5000:5000 --env-file graph.key xiaodanmao/markote:latest`
   2. Run from source code
      1. Install [cairo](https://cairographics.org/)
      2. Install [Node.js](https://nodejs.org/en/)
      3. Clone the code
      4. Install

          ```
          python3 setup.py install
          npm install
          npm run build
          ```
      5. Install [gunicorn](http://gunicorn.org/)
      6. Add `GRAPH_CLIENT_ID` and `GRAPH_CLIENT_SECRET` in `gunicorn.py` 
      7. Run the app

          ```
          gunicorn -c gunicorn.py wsgi:app &
          ```
2. Install [nginx](https://www.nginx.com/)
3. Install [certbot](https://certbot.eff.org/) and run [instructions](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)
4. Create `markote.conf` under `/etc/nginx/conf.d` with the following content:

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
            proxy_set_header X-Forwarded-Proto $proxy_add_x_forwarded_for;
            proxy_set_header X-Scheme $scheme;
        }
    }
    ```
11. Run `nginx -s reload`

### Azure App Services
1. Click `Add` under `App Services`, select `Docker Container` as publish method
2. Select `Single Container` as `Options`, `Docker Hub` as `Image Source`, `Public` as `Acess Type` and type `xiaodanmao/markote` in `Image and tag` field
3. Add `GRAPH_CLIENT_ID=your client id`, `GRAPH_CLIENT_SECRET=your client secret`, `MARKOTE_URL_SCHEME=https` as application settings under `Configuration` 

## Demo
[Azure App Services](http://markote.azurewebsites.net/)

## Buy me a coffee
<a href="https://www.buymeacoffee.com/XiaodanMao" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## License
[MIT](LICENSE)
