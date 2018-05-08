from flask import jsonify
from onemark.api.api_blueprint import api_blueprint
from onemark.oauth import oauth


@api_blueprint.route('/sections/<section_id>/pages', methods=['GET'])
def get_pages(section_id):
    oauth_client = oauth.microsoft_graph
    sections = oauth_client.get(
        'me/onenote/sections/{0}/pages'.format(section_id)).json()

    return jsonify(sections)