import uuid
from flask import session, request, redirect, url_for, \
    current_app, render_template, Blueprint
from flask_oauthlib.client import OAuth


microsoft_graph = None
login_blueprint = Blueprint('login_blueprint', __name__)


@login_blueprint.route('/login')
def login():
    client_id = current_app.config.get('CLIENT_ID')
    client_secret = current_app.config.get('CLIENT_SECRET')
    access_token_url = current_app.config.get('ACCESS_TOKEN_URL')
    authorize_url = current_app.config.get('AUTHORIZE_URL')
    scope = current_app.config.get('SCOPE')

    guid = uuid.uuid4()
    oauth = OAuth()
    global microsoft_graph
    microsoft_graph = oauth.remote_app(
                'microsoft graph',
                base_url='https://graph.microsoft.com/v1.0/',
                request_token_url=None,
                access_token_url=access_token_url,
                authorize_url=authorize_url,
                request_token_params={'scope': scope},
                consumer_key=client_id,
                consumer_secret=client_secret)

    session['state'] = guid

    return microsoft_graph.authorize(
        callback=url_for('login_blueprint.authorized', _external=True),
        state=guid)


@login_blueprint.route('/login/authorized')
def authorized():
    response = microsoft_graph.authorized_response()

    if response is None:
        message = 'Access Denied: Reason={0}, Error={1}'.format(
            request.args['error'], request.args['error_description'])

        return redirect('error', message=message)

    if str(session['state']) != str(request.args['state']):
        raise Exception('State has been messed with, end authentication')

    return redirect('notes')
