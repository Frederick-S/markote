from functools import wraps
from flask import request, redirect, url_for, session


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.path != '/logout' and session.get('token') is None:
            return redirect(url_for('auth_blueprint.login', next=request.url))

        return f(*args, **kwargs)

    return decorated_function
