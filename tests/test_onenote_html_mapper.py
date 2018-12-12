import unittest
from markote.onenote_html_mapper import OneNoteHtmlMapper
from pyquery import PyQuery


class OneNoteHtmlMapperTestCase(unittest.TestCase):
    def test_convert_svg_to_image(self):
        html = '''
            <div>
                <p>
                    <svg width="100" height="100">
                        <circle cx="50" cy="50" r="40" stroke="green"
                         stroke-width="4" fill="yellow" />
                    </svg>
                </p>
            </div>
        '''
        document = PyQuery(html)
        onenote_html_mapper = OneNoteHtmlMapper(document)

        onenote_html_mapper.convert()

        self.assertTrue('img' in onenote_html_mapper.get_html())
        self.assertFalse('svg' in onenote_html_mapper.get_html())

    def test_convert_inline_image_to_table(self):
        html = '''
            <div>
                <p>
                    Hello <img src="http://abc.jpg" /> Hello
                </p>
            </div>
        '''
        document = PyQuery(html)
        onenote_html_mapper = OneNoteHtmlMapper(document)

        onenote_html_mapper.convert()

        self.assertTrue('table' in onenote_html_mapper.get_html())
