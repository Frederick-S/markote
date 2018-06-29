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
        self._move_inline_images_to_table()

        # Hack for https://stackoverflow.com/questions/50789978
        if self._only_contains_table():
            self._table_only_content_hack()

    def get_html(self):
        return self.document.outer_html()

    def _convert_svg_to_resources(self):
        self.resources = [self._convert_svg_to_resource(svg_element)
                          for svg_element in self.document.find('svg')]

    def _convert_svg_to_resource(self, svg_element):
        name = uuid.uuid4().hex
        element = PyQuery(svg_element)
        svg = element.outer_html().replace('viewbox', 'viewBox')

        element.replace_with(PyQuery('<img src="name:{0}" />'.format(name)))

        return Resource(name, convert_svg_to_png(svg), 'image/png')

    def _move_inline_images_to_table(self):
        images = self.document.find('img')
        parents = [tuple(PyQuery(image).parent()) for image in images]
        parents = list(map(lambda x: PyQuery(x[0]), list(set(parents))))
        parents = list(filter(lambda x: self._has_inline_images(x), parents))

        for parent in parents:
            table = PyQuery('<table></table>')
            table.append(self._create_table_row_with_inline_images(
                parent.contents()))

            parent.replace_with(table)

    def _has_inline_images(self, element):
        return element.contents().length > element.find('img').length

    def _create_table_cell_with_elements(self, elements):
        cell = PyQuery('<td></td>')

        for element in elements:
            cell.append(element)

        return cell

    def _create_table_row_with_inline_images(self, contents):
        children_so_far = []
        row = PyQuery('<tr></tr>')

        for content in contents:
            if hasattr(content, 'tag') and content.tag == 'img':
                if len(children_so_far) != 0:
                    row.append(self._create_table_cell_with_elements(
                        children_so_far))

                    children_so_far = []

                row.append(
                    '<td>{0}</td>'.format(PyQuery(content).outer_html()))
            else:
                children_so_far.append(content)

        if len(children_so_far) != 0:
            row.append(self._create_table_cell_with_elements(
                children_so_far))

        return row

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
