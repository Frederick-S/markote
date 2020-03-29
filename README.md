# Markote - Save markdown notes to OneNote
[![Build Status](https://travis-ci.org/Frederick-S/markote.svg?branch=master)](https://travis-ci.org/Frederick-S/markote) [![Build status](https://ci.appveyor.com/api/projects/status/w6f5wr4vn4lublch/branch/master?svg=true)](https://ci.appveyor.com/project/Frederick-S/markote/branch/master) [![codecov](https://codecov.io/gh/Frederick-S/markote/branch/master/graph/badge.svg)](https://codecov.io/gh/Frederick-S/markote) [![Requirements Status](https://requires.io/github/Frederick-S/markote/requirements.svg?branch=master)](https://requires.io/github/Frederick-S/markote/requirements/?branch=master) [![dependencies Status](https://david-dm.org/Frederick-S/markote/status.svg)](https://david-dm.org/Frederick-S/markote) [![devDependencies Status](https://david-dm.org/Frederick-S/markote/dev-status.svg)](https://david-dm.org/Frederick-S/markote?type=dev) [![codebeat badge](https://codebeat.co/badges/44e3e0d4-9f45-4828-b840-7b3d03214a53)](https://codebeat.co/projects/github-com-frederick-s-markote-master) [![Maintainability](https://api.codeclimate.com/v1/badges/8ae219fa1feff5627c2e/maintainability)](https://codeclimate.com/github/Frederick-S/markote/maintainability) [![DeepScan grade](https://deepscan.io/api/teams/3308/projects/4938/branches/38690/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3308&pid=4938&bid=38690)

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
1. Install [Cairo](https://cairographics.org/). For Windows users, you can also download standalone [Cairo dlls](https://github.com/preshing/cairo-windows/releases) and add its path to `PATH` environment variable
2. Clone the code
3. Add your own `Application Id` and `Application secret` to `config.py` or add them as environment variables
4. Run `yarn && yarn build`
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
      2. Install [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/)
      3. Clone the code
      4. Install

          ```
          python3 setup.py install
          yarn
          yarn build
          ```
      5. Install [gunicorn](http://gunicorn.org/)
      6. Add `GRAPH_CLIENT_ID` and `GRAPH_CLIENT_SECRET` in `gunicorn.py` 
      7. Run the app

          ```
          gunicorn -c gunicorn.py wsgi:app &
          ```
2. Install [certbot](https://certbot.eff.org/)
3. Install [nginx](https://www.nginx.com/)
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
11. Restart `nginx`

### Azure App Services
1. Click `Add` under `App Services`, select `Docker Container` as publish method
2. Select `Single Container` as `Options`, `Docker Hub` as `Image Source`, `Public` as `Acess Type` and type `xiaodanmao/markote` in `Image and tag` field
3. Add `GRAPH_CLIENT_ID=your client id`, `GRAPH_CLIENT_SECRET=your client secret`, `MARKOTE_URL_SCHEME=https` as application settings under `Configuration` 

## License
[MIT](LICENSE)
