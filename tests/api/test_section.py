from .base_api_test import BaseApiTestCase


class SectionTestCase(BaseApiTestCase):
    def test_create_section(self):
        response = self.client.post('/api/v1/notebooks/1/sections', json={
            'displayName': 'displayName'
        })

        self.assertEqual(401, response.status_code)

    def test_get_pages(self):
        response = self.client.get('/api/v1/sections/1/pages')

        self.assertEqual(401, response.status_code)
