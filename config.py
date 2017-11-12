import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'
    CLIENT_ID = os.environ.get('CLIENT_ID') or 'client id'
    CLIENT_SECRET = os.environ.get('CLIENT_SECRET') or 'client secret'
    ACCESS_TOKEN_URL = \
        'https://login.microsoftonline.com/common/oauth2/v2.0/token'
    AUTHORIZE_URL = \
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
    SCOPE = 'User.Read'

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig
}
