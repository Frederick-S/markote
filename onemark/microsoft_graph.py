import os
from flask_oauthlib.client import OAuth


client_id = os.environ.get('CLIENT_ID') or 'client id'
client_secret = os.environ.get('CLIENT_SECRET') or 'client secret'
access_token_url = 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
authorize_url = \
    'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
scope = 'Notes.Create Notes.Read User.Read'

oauth = OAuth()
microsoft_graph = oauth.remote_app(
    'microsoft graph',
    base_url='https://graph.microsoft.com/v1.0/',
    request_token_url=None,
    access_token_url=access_token_url,
    authorize_url=authorize_url,
    request_token_params={'scope': scope},
    consumer_key=client_id,
    consumer_secret=client_secret)
