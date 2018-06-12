import io
import json
import uuid
from flask import jsonify, request
from PIL import Image
from pyquery import PyQuery
from markote.api.api_blueprint import api_blueprint
from markote.oauth import oauth
from markote.onenote_html_mapper import OneNoteHtmlMapper
from markote.resource import Resource
from markote.util import convert_svg_to_png

MARKDOWN_FILE_OBJECT_HTML = '<object data-id="markdown-file" ' \
                            'data-attachment="markdown.md" ' \
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
    page = request.json
    original_content = _get_page_content(id)
    original_document = PyQuery(original_content)
    content_div = original_document('div[data-id="content"]')
    new_document = PyQuery('<div>{0}</div>'.format(page['content']))
    resources = _convert_svg_to_resources(new_document)

    # Hack for https://stackoverflow.com/questions/50789978
    if _page_content_only_contains_table(new_document):
        _table_only_content_hack(new_document, resources)

    content = '<div data-id="content">{0}</div>'.format(
        OneNoteHtmlMapper(new_document).get_html())
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
        'markdown': ('markdown.md', io.StringIO(page['markdown']),
                     'text/markdown')
    }

    for resource in resources:
        files[resource.name] = ('', resource.file, resource.content_type)

    oauth_client = oauth.microsoft_graph
    response = oauth_client.request(
        'PATCH', 'me/onenote/pages/{0}/content'.format(id), files=files)

    return response.content, response.status_code


def _get_page_content(id):
    oauth_client = oauth.microsoft_graph
    response = oauth_client.get(
        'me/onenote/pages/{0}/content?includeIDs=true'.format(id))

    return response.content


def _convert_svg_to_resources(document):
    return [_convert_svg_to_resource(svg) for svg in document.find('svg')]


def _convert_svg_to_resource(svg):
    name = uuid.uuid4().hex
    element = PyQuery(svg)
    svg_string = element.outer_html().replace('viewbox', 'viewBox')

    element.replace_with(PyQuery('<img src="name:{0}" />'.format(name)))

    return Resource(name, convert_svg_to_png(svg_string), 'image/png')


def _page_content_only_contains_table(document):
    return all(element.tag == 'table' for element in document.children())


def _table_only_content_hack(document, resources):
    file = io.BytesIO()
    image = Image.new('RGB', (1, 1), color='white')
    image.save(file, 'png')
    file.seek(0)

    name = uuid.uuid4().hex
    element = PyQuery('<img src="name:{0}" />'.format(name))

    document.append(element)

    resources.append(Resource(name, file, 'image/png'))
