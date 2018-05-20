from flask import jsonify, request
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth


@api_blueprint.route('/sections/<section_id>/pages', methods=['POST'])
def create_page(section_id):
    page = request.json
    headers = {'Content-type': 'text/html'}
    content = '''
        <!DOCTYPE html>
        <html>
            <head>
                <title>{0}</title>
            </head>
            <body></body>
        </html>
    '''.format(page['title'])

    oauth_client = oauth.microsoft_graph
    response = oauth_client.post(
        'me/onenote/sections/{0}/pages'.format(section_id),
        headers=headers, data=content).json()

    return jsonify(response)


@api_blueprint.route('/pages/<id>', methods=['GET'])
def get_page(id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/pages/{0}'.format(id)).json()

    return jsonify(response)


@api_blueprint.route('/pages/<id>/content', methods=['GET'])
def get_page_content(id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/pages/{0}/content?includeIDs=true'.format(id))

    return response.content


@api_blueprint.route('/pages/<id>/content', methods=['PATCH'])
def update_page(id):
    page = request.json
    data = [
        {
            'target': 'body',
            'action': 'append',
            'content': page['content']
        }
    ]

    oauth_client = oauth.microsoft_graph
    response = oauth_client.request(
        'PATCH', 'me/onenote/pages/{0}/content'.format(id), json=data)

    return response.content
