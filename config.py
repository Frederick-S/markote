import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'

    GRAPH_CLIENT_ID = os.environ.get('GRAPH_CLIENT_ID') or 'client id'

    GRAPH_CLIENT_SECRET = \
        os.environ.get('GRAPH_CLIENT_SECRET') or 'client secret'

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False


configs = {
    'development': DevelopmentConfig,
    'testing': TestingConfig
}
