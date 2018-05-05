from flask import Blueprint, jsonify
from onemark.microsoft_graph import microsoft_graph

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/notebooks', methods=['GET'])
def notebooks():
    return jsonify(microsoft_graph.get('me/onenote/notebooks').data.get('value'))
