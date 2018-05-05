from flask import Blueprint, jsonify
from onemark.microsoft_graph import microsoft_graph

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/notebooks', methods=['GET'])
def get_notebooks():
    notebooks = microsoft_graph.get('me/onenote/notebooks').data.get('value')

    return jsonify(notebooks)
