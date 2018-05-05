from flask import Blueprint, jsonify
from onemark.oauth import oauth

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/notebooks', methods=['GET'])
def get_notebooks():
    oauth_client = oauth.microsoft_graph
    notebooks = oauth_client.get('me/onenote/notebooks').json()

    return jsonify(notebooks)
