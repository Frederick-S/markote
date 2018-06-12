import io
import uuid
from lxml.html import HtmlElement
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
        self._move_inline_images_to_table()

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

    def _move_inline_images_to_table(self):
        images = self.document.find('img')
        parents = [tuple(PyQuery(image).parent()) for image in images]

        for parent in list(set(parents)):
            parent_element = PyQuery(parent[0])
            table = PyQuery('<table></table>')
            row = PyQuery('<tr></tr>')
            children_so_far = []

            for child in parent_element.contents():
                if isinstance(child, HtmlElement) and child.tag == 'img':
                    if len(children_so_far) != 0:
                        row.append(self._create_table_cell_with_elements(
                            children_so_far))

                        children_so_far = []

                    row.append(
                        '<td>{0}</td>'.format(PyQuery(child).outer_html()))
                else:
                    children_so_far.append(child)

            if len(children_so_far) != 0:
                row.append(self._create_table_cell_with_elements(
                    children_so_far))

            table.append(row)
            parent_element.replace_with(table)

    def _create_table_cell_with_elements(self, children):
        cell = PyQuery('<td></td>')

        for child in children:
            cell.append(child)

        return cell

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
