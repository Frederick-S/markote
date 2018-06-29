from .base_api_test import BaseApiTestCase


class UserTestCase(BaseApiTestCase):
    def test_get_me(self):
        response = self.client.get('/api/v1/me')

        self.assertEqual(401, response.status_code)
