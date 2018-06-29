from ..base_test import BaseTestCase


class ApiBlueprintTestCase(BaseTestCase):
    def test_call_api_without_token(self):
        response = self.client.get('/api/v1/notebooks')

        self.assertEqual(401, response.status_code)
