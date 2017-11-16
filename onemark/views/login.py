import uuid
from flask import session, request, redirect, url_for, \
    current_app, render_template, Blueprint
from onemark.microsoft_graph import microsoft_graph


login_blueprint = Blueprint('login_blueprint', __name__)


@login_blueprint.route('/login')
def login():
    guid = uuid.uuid4()
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

    session['access_token'] = (response['access_token'], '')

    return redirect('notes')


@microsoft_graph.tokengetter
def get_access_token():
    return session.get('access_token')
