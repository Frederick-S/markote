from ..base_test import BaseTestCase


class BaseApiTestCase(BaseTestCase):
    def setUp(self):
        super(BaseApiTestCase, self).setUp()

        with self.client.session_transaction() as session:
            session['token'] = {
                'token_type': 'Bearer',
                'expires_in': '3600',
                'access_token': 'abc'
            }
