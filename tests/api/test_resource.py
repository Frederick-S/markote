from .base_api_test import BaseApiTestCase


class ResourceTestCase(BaseApiTestCase):
    def test_get_resource_content(self):
        response = self.client.get('/api/v1/resources/123/content')

        self.assertEqual(401, response.status_code)
