import unittest
from markote.util import convert_svg_to_png


class UtilTestCase(unittest.TestCase):
    def test_convert_svg_to_png(self):
        svg_string = '''
            <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="green"
                 stroke-width="4" fill="yellow" />
            </svg>
        '''

        output = convert_svg_to_png(svg_string)

        self.assertTrue(output.getbuffer().nbytes > 0)
