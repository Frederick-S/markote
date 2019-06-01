import os


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'

    GRAPH_CLIENT_ID = os.environ.get('GRAPH_CLIENT_ID') or 'client id'

    GRAPH_CLIENT_SECRET = \
        os.environ.get('GRAPH_CLIENT_SECRET') or 'client secret'


class DevelopmentConfig(Config):
    ENV = 'development'
    TEMPLATES_AUTO_RELOAD = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False


class ProductionConfig(Config):
    pass


configs = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}
