from flask import jsonify, request
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth


@api_blueprint.route('/sections/<section_id>/pages', methods=['POST'])
def create_page(section_id):
    page = request.json
    content = '''
        <!DOCTYPE html>
        <html>
            <head>
                <title>{0}</title>
            </head>
            <body>
                {1}
            </body>
        </html>
    '''.format(page['title'], page['content'])
    oauth_client = oauth.microsoft_graph
    response = oauth_client.post(
        'me/onenote/sections/{0}/pages'.format(section_id),
        headers={'Content-type': 'text/html'}, data=content).json()

    return jsonify(response)
