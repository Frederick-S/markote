from flask import jsonify
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth


@api_blueprint.route('/sections/<section_id>/pages', methods=['GET'])
def get_pages(section_id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/sections/{0}/pages?$select=id,title'.format(
            section_id)).json()

    return jsonify(response)
