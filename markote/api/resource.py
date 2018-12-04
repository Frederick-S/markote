from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth


@api_blueprint.route('/resources/<resource_id>/content', methods=['GET'])
def get_resource(resource_id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/resources/{0}/$value'.format(resource_id))

    return response.content, response.status_code
