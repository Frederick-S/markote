import unittest
from markote.bootstrap import create_app


class ViewsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.client = self.app.test_client()

    def test_get_notes_page(self):
        with self.client.session_transaction() as session:
            session['token'] = {
                'token_type': 'Bearer',
                'expires_in': '3600',
                'access_token': 'abc'
            }

        response = self.client.get('/')

        self.assertEqual(200, response.status_code)
