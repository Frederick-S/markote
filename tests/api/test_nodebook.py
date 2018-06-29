from .base_api_test import BaseApiTestCase


class NotebookTestCase(BaseApiTestCase):
    def test_api_with_invalid_client_credential(self):
        response = self.client.get('/api/v1/notebooks')

        self.assertEqual(401, response.status_code)
