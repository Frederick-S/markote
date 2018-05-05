import os
from flask import session
from authlib.flask.client import OAuth


def fetch_token(name):
    return session.get('token')


client_id = os.environ.get('CLIENT_ID') or 'client id'
client_secret = os.environ.get('CLIENT_SECRET') or 'client secret'
access_token_url = 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
authorize_url = \
    'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
scope = 'Notes.Create Notes.Read User.Read'

oauth = OAuth(fetch_token=fetch_token)
oauth.register(
    name='microsoft_graph',
    client_id=client_id,
    client_secret=client_secret,
    api_base_url='https://graph.microsoft.com/v1.0/',
    access_token_url=access_token_url,
    authorize_url=authorize_url,
    client_kwargs={'scope': scope})
