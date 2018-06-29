from .base_api_test import BaseApiTestCase


class PageTestCase(BaseApiTestCase):
    def test_create_page(self):
        response = self.client.post('/api/v1/sections/1/pages', json={
            'title': 'title'
        })

        self.assertEqual(401, response.status_code)

    def test_get_page(self):
        response = self.client.get('/api/v1/pages/1')

        self.assertEqual(401, response.status_code)

    def test_get_page_content(self):
        response = self.client.get('/api/v1/pages/1/content')

        self.assertEqual(401, response.status_code)

    def test_get_page_markdown(self):
        response = self.client.get('/api/v1/pages/1/markdown')

        self.assertEqual(401, response.status_code)

    def test_update_page(self):
        response = self.client.patch('/api/v1/pages/1/content', json={
            'title': 'title',
            'content': '''
                <div>
                    <p>
                        <svg width="100" height="100">
                            <circle cx="50" cy="50" r="40" stroke="green"
                             stroke-width="4" fill="yellow" />
                        </svg>
                    </p>
                </div>
            '''
        })

        self.assertEqual(401, response.status_code)
