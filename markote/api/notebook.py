from flask import jsonify
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth


@api_blueprint.route('/notebooks', methods=['GET'])
def get_notebooks():
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/notebooks?$select=id,displayName').json()

    return jsonify(response)


@api_blueprint.route('/notebooks/<notebook_id>/sections', methods=['GET'])
def get_sections(notebook_id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/notebooks/{0}/sections?$select=id,displayName'.format(
            notebook_id)).json()

    return jsonify(response)
