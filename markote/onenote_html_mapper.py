import io
import uuid
from PIL import Image
from pyquery import PyQuery
from markote.resource import Resource
from markote.util import convert_svg_to_png


class OneNoteHtmlMapper:
    def __init__(self, document):
        self.document = document
        self.resources = []

    def convert(self):
        self._convert_svg_to_resources()

        # Hack for https://stackoverflow.com/questions/50789978
        if self._only_contains_table():
            self._table_only_content_hack()

    def get_html(self):
        return self.document.outer_html()

    def _convert_svg_to_resources(self):
        self.resources = [self._convert_svg_to_resource(svg)
                          for svg in self.document.find('svg')]

    def _convert_svg_to_resource(self, svg):
        name = uuid.uuid4().hex
        element = PyQuery(svg)
        svg_string = element.outer_html().replace('viewbox', 'viewBox')

        element.replace_with(PyQuery('<img src="name:{0}" />'.format(name)))

        return Resource(name, convert_svg_to_png(svg_string), 'image/png')

    def _only_contains_table(self):
        return all(element.tag == 'table'
                   for element in self.document.children())

    def _table_only_content_hack(self):
        file = io.BytesIO()
        image = Image.new('RGB', (1, 1), color='white')
        image.save(file, 'png')
        file.seek(0)

        name = uuid.uuid4().hex
        element = PyQuery('<img src="name:{0}" />'.format(name))

        self.document.append(element)
        self.resources.append(Resource(name, file, 'image/png'))
