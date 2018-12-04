import uuid
from flask import jsonify, request
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth


@api_blueprint.route('/onedrive/files', methods=['POST'])
def upload_file():
    file = request.files['file']
    file_id = uuid.uuid4().hex
    file_name = '{0}{1}'.format(
        file_id, file.filename[file.filename.rfind('.'):])

    oauth_client = oauth.microsoft_graph
    response = oauth_client.put(
        'me/drive/special/approot:/{0}:/content'.format(file_name), data=file)

    return jsonify(response.json()), response.status_code


@api_blueprint.route('/onedrive/files/<file_id>/content', methods=['GET'])
def get_file(file_id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/drive/special/approot:/{0}:/content'.format(file_id))

    return response.content, response.status_code
