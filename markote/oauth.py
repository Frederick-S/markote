from flask import session
from authlib.integrations.flask_client import OAuth
from markote.graph import Graph


def fetch_token(name):
    return session.get('token')


def update_token(token, name):
    session['token'] = token


oauth = OAuth(fetch_token=fetch_token, update_token=update_token)


def register_graph_client(client_id, client_secret):
    oauth.register(
        name=Graph.NAME,
        client_id=client_id,
        client_secret=client_secret,
        api_base_url=Graph.API_BASE_URL,
        access_token_url=Graph.ACCESS_TOKEN_URL,
        authorize_url=Graph.AUTHORIZE_URL,
        refresh_token_url=Graph.REFRESH_TOKEN_URL,
        client_kwargs={'scope': Graph.SCOPE})
