from flask import jsonify, request
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth


@api_blueprint.route('/notebooks', methods=['GET'])
def get_notebooks():
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/notebooks?$select=id,displayName')

    return jsonify(response.json()), response.status_code


@api_blueprint.route('/notebooks/<notebook_id>/sections', methods=['GET'])
def get_sections(notebook_id):
    name = request.args.get('name')
    query_filter = '$filter=displayName eq \'{0}\''.format(name) \
        if name else ''

    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/notebooks/{0}/sections?$select=id,displayName&{1}'.format(
            notebook_id, query_filter))

    return jsonify(response.json()), response.status_code
