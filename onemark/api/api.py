from flask import Blueprint, jsonify
from onemark.microsoft_graph import microsoft_graph

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/notebooks', methods=['GET'])
def get_notebooks():
    client = microsoft_graph.create_client('microsoft graph')
    notebooks = client.get('me/onenote/notebooks').json()

    return jsonify(notebooks)
