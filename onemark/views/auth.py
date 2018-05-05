from flask import session, redirect, url_for, Blueprint
from onemark.microsoft_graph import microsoft_graph


auth_blueprint = Blueprint('auth_blueprint', __name__)


@auth_blueprint.route('/login')
def login():
    client = microsoft_graph.create_client('microsoft graph')
    redirect_uri = url_for('auth_blueprint.authorized', _external=True)

    return client.authorize_redirect(redirect_uri)


@auth_blueprint.route('/login/authorized')
def authorized():
    client = microsoft_graph.create_client('microsoft graph')
    token = client.authorize_access_token()

    session['token'] = token

    return redirect('notes')
