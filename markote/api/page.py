import io
import json
from flask import jsonify, request
from pyquery import PyQuery
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth
from markote.onenote_html_mapper import OneNoteHtmlMapper

MARKDOWN_FILE_OBJECT_HTML = '<object data-id="markdown-file" ' \
                            'data-attachment="content.md" ' \
                            'data="name:markdown" ' \
                            'type="text/markdown" />'


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
    '''.format(page['title'], MARKDOWN_FILE_OBJECT_HTML)
    files = {
        'Presentation': ('', io.StringIO(content), 'text/html'),
        'markdown': ('content.md', io.StringIO(''), 'text/markdown')
    }

    oauth_client = oauth.microsoft_graph
    response = oauth_client.post(
        'me/onenote/sections/{0}/pages'.format(section_id), files=files)

    return jsonify(response.json()), response.status_code


@api_blueprint.route('/pages/<page_id>', methods=['GET'])
def get_page(page_id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/pages/{0}'.format(page_id))

    return jsonify(response.json()), response.status_code


@api_blueprint.route('/pages/<page_id>/content', methods=['GET'])
def get_page_content(page_id):
    return _get_page_content(page_id)


@api_blueprint.route('/pages/<page_id>/markdown', methods=['GET'])
def get_page_markdown(page_id):
    content, status_code = _get_page_content(page_id)

    if status_code != 200:
        return '', status_code

    document = PyQuery(content)
    markdown_file_url = \
        document('object[data-id="markdown-file"]').attr('data')

    if not markdown_file_url:
        return '', 404

    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(markdown_file_url)

    return response.content, response.status_code


@api_blueprint.route('/pages/<page_id>/content', methods=['PATCH'])
def update_page(page_id):
    page = request.json
    original_content, status_code = _get_page_content(page_id)

    if status_code != 200:
        return '', status_code

    original_document = PyQuery(original_content)
    content_div = original_document('div[data-id="content"]')
    new_document = PyQuery('<div>{0}</div>'.format(page['content']))
    one_note_html_mapper = OneNoteHtmlMapper(new_document)
    one_note_html_mapper.convert()

    content = '<div data-id="content">{0}</div>'.format(
        one_note_html_mapper.get_html())
    update_target, update_action = (content_div.attr('id'), 'replace') \
        if content_div else ('body', 'append')

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
        },
        {
            'target': update_target,
            'action': update_action,
            'content': content
        }
    ]

    files = {
        'Commands': ('', io.StringIO(json.dumps(commands)),
                     'application/json'),
        'markdown': ('content.md', io.StringIO(page['markdown']),
                     'text/markdown')
    }

    for resource in one_note_html_mapper.resources:
        files[resource.name] = ('', resource.file, resource.content_type)

    oauth_client = oauth.microsoft_graph
    response = oauth_client.request(
        'PATCH', 'me/onenote/pages/{0}/content'.format(page_id), files=files)

    return response.content, response.status_code


def _get_page_content(page_id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/pages/{0}/content?includeIDs=true'.format(page_id))

    return response.content, response.status_code
