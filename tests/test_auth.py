from .base_test import BaseTestCase


class AuthTestCase(BaseTestCase):
    def test_auth_redirect(self):
        response = self.client.get('/')

        self.assertEqual(302, response.status_code)
