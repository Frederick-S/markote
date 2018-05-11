from flask import jsonify
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth


@api_blueprint.route('/me', methods=['GET'])
def get_me():
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get('me').json()

    return jsonify(response)
