from .base_api_test import BaseApiTestCase


class NotebookTestCase(BaseApiTestCase):
    def test_get_notes(self):
        response = self.client.get('/api/v1/notebooks')

        self.assertEqual(401, response.status_code)

    def test_get_sections(self):
        response = self.client.get('/api/v1/notebooks/1/sections')

        self.assertEqual(401, response.status_code)
