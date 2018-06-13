from flask import jsonify, request
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth


@api_blueprint.route('/notebooks/<notebook_id>/sections', methods=['POST'])
def create_section(notebook_id):
    section = request.json

    oauth_client = oauth.microsoft_graph
    response = oauth_client.post(
        'me/onenote/notebooks/{0}/sections'.format(notebook_id), json=section)

    return jsonify(response.json()), response.status_code


@api_blueprint.route('/sections/<section_id>/pages', methods=['GET'])
def get_pages(section_id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/sections/{0}/pages?$select=id,title'.format(
            section_id))

    return jsonify(response.json()), response.status_code
