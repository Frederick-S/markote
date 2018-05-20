import io
from flask import jsonify, request
from pyquery import PyQuery
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
                <object data-attachment="markdown.md" data="name:markdown" \
                    type="text/markdown" />
            </body>
        </html>
    '''.format(page['title'])
    files = {
        'Presentation': ('', io.StringIO(content), 'text/html'),
        'markdown': ('markdown.md', io.StringIO(''), 'text/plain')
    }

    oauth_client = oauth.microsoft_graph
    response = oauth_client.post(
        'me/onenote/sections/{0}/pages'.format(section_id), files=files).json()

    return jsonify(response)


@api_blueprint.route('/pages/<id>', methods=['GET'])
def get_page(id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/pages/{0}'.format(id)).json()

    return jsonify(response)


@api_blueprint.route('/pages/<id>/content', methods=['GET'])
def get_page_content(id):
    return _get_page_content(id)


@api_blueprint.route('/pages/<id>/content', methods=['PATCH'])
def update_page(id):
    original_content = _get_page_content(id)
    document = PyQuery(original_content)
    content_div = document('div[data-id="content"]')
    page = request.json

    target, action = (content_div.attr('id'), 'replace') if content_div \
        else ('body', 'append')

    data = [
        {
            'target': target,
            'action': action,
            'content': '<div data-id="content">{0}</div>'.format(
                page['content'])
        }
    ]

    oauth_client = oauth.microsoft_graph
    response = oauth_client.request(
        'PATCH', 'me/onenote/pages/{0}/content'.format(id), json=data)

    return response.content


def _get_page_content(id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/pages/{0}/content?includeIDs=true'.format(id))

    return response.content
