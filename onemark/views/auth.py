from flask import session, redirect, url_for, Blueprint
from onemark.oauth import oauth


auth_blueprint = Blueprint('auth_blueprint', __name__)


@auth_blueprint.route('/login')
def login():
    oauth_client = oauth.microsoft_graph
    redirect_uri = url_for('auth_blueprint.authorized', _external=True)

    return oauth_client.authorize_redirect(redirect_uri)


@auth_blueprint.route('/login/authorized')
def authorized():
    oauth_client = oauth.microsoft_graph
    token = oauth_client.authorize_access_token()

    session['token'] = token

    return redirect('notes')
