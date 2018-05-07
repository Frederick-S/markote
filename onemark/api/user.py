from flask import jsonify
from onemark.api.api_blueprint import api_blueprint
from onemark.oauth import oauth


@api_blueprint.route('/me', methods=['GET'])
def get_me():
    oauth_client = oauth.microsoft_graph
    notebooks = oauth_client.get('me').json()

    return jsonify(notebooks)
