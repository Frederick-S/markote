import io
from .base_api_test import BaseApiTestCase


class OneDriveTestCase(BaseApiTestCase):
    def test_get_onedrive_file_content(self):
        response = self.client.get('/api/v1/onedrive/files/abc/content')

        self.assertEqual(401, response.status_code)

    def test_upload_file(self):
        response = self.client.post('/api/v1/onedrive/files', data={
            'file': (io.BytesIO(), 'file.txt')
        })

        self.assertEqual(401, response.status_code)
