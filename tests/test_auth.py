import unittest
from markote.bootstrap import create_app


class AuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.client = self.app.test_client()

    def test_auth_redirect(self):
        response = self.client.get('/')

        self.assertEqual(302, response.status_code)
