from flask import jsonify
from onemark.api.api_blueprint import api_blueprint
from onemark.oauth import oauth


@api_blueprint.route('/notebooks', methods=['GET'])
def get_notebooks():
    oauth_client = oauth.microsoft_graph
    notebooks = oauth_client.get('me/onenote/notebooks').json()

    return jsonify(notebooks)


@api_blueprint.route('/notebooks/<id>/sections', methods=['GET'])
def get_sections(id):
    oauth_client = oauth.microsoft_graph
    sections = oauth_client.get(
        'me/onenote/notebooks/{0}/sections'.format(id)).json()

    return jsonify(sections)
