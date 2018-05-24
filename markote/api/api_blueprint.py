from flask import Blueprint, session

api_blueprint = Blueprint('api', __name__)


@api_blueprint.before_request
def before_request():
    if not session.get('token'):
        return '', 401
