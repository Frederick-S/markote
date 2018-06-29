from .base_test import BaseTestCase


class AuthTestCase(BaseTestCase):
    def test_auth_redirect(self):
        response = self.client.get('/')

        self.assertEqual(302, response.status_code)

    def test_api_with_invalid_client_credential(self):
        with self.client.session_transaction() as session:
            session['token'] = {
                'token_type': 'Bearer',
                'expires_in': '3600',
                'access_token': 'abc'
            }

        response = self.client.get('/api/v1/notebooks')

        self.assertEqual(401, response.status_code)
