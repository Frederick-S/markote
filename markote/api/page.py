from datetime import datetime, timezone
import io
import json
from flask import jsonify, request
from pyquery import PyQuery
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth

MARKDOWN_FILE_OBJECT_HTML = '<object data-id="markdown-file" ' \
                            'data-attachment="markdown.md" ' \
                            'data="name:markdown" ' \
                            'type="text/markdown" />'


@api_blueprint.route('/sections/<section_id>/pages', methods=['POST'])
def create_page(section_id):
    page = request.json
    created_at = datetime.utcnow().replace(tzinfo=timezone.utc).isoformat()
    content = '''
        <!DOCTYPE html>
        <html>
            <head>
                <title>{0}</title>
                <meta name="created" content="{1}" />
            </head>
            <body>
                {2}
            </body>
        </html>
    '''.format(page['title'], created_at, MARKDOWN_FILE_OBJECT_HTML)
    files = {
        'Presentation': ('', io.StringIO(content), 'text/html'),
        'markdown': ('markdown.md', io.StringIO(''), 'text/markdown')
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


@api_blueprint.route('/pages/<id>/markdown', methods=['GET'])
def get_page_markdown(id):
    content = _get_page_content(id)
    document = PyQuery(content)
    markdown_file_url = \
        document('object[data-id="markdown-file"]').attr('data')

    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(markdown_file_url)

    return response.content


@api_blueprint.route('/pages/<id>/content', methods=['PATCH'])
def update_page(id):
    original_content = _get_page_content(id)
    document = PyQuery(original_content)
    content_div = document('div[data-id="content"]')
    page = request.json

    commands = [
        {
            'target': 'title',
            'action': 'replace',
            'content': page['title']
        },
        {
            'target': '#markdown-file',
            'action': 'replace',
            'content': MARKDOWN_FILE_OBJECT_HTML
        }
    ]

    content = '<div data-id="content">{0}</div>'.format(page['content'])

    if content_div:
        commands.append({
            'target': content_div.attr('id'),
            'action': 'replace',
            'content': content
        })
    else:
        commands.append({
            'target': 'body',
            'action': 'append',
            'content': content
        })

    files = {
        'Commands': ('', io.StringIO(json.dumps(commands)),
                     'application/json'),
        'markdown': ('markdown.md', io.StringIO(page['markdown']),
                     'text/markdown')
    }

    oauth_client = oauth.microsoft_graph
    response = oauth_client.request(
        'PATCH', 'me/onenote/pages/{0}/content'.format(id), files=files)

    return response.content


def _get_page_content(id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/pages/{0}/content?includeIDs=true'.format(id))

    return response.content