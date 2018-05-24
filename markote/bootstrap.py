from flask import Flask
from config import configs
from markote.views.home import home_blueprint
from markote.views.auth import auth_blueprint
from markote.views.notes import notes_blueprint
from markote.views.error import error_blueprint
from markote.api.api_blueprint import api_blueprint
from markote.api.api_bootstrap import init_api_routes
from markote.oauth import oauth


def create_app(config_name):
    config = configs[config_name]
    app = Flask(__name__)
    app.config.from_object(config)

    config.init_app(app)
    oauth.init_app(app)
    init_api_routes()

    app.register_blueprint(home_blueprint)
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(notes_blueprint)
    app.register_blueprint(error_blueprint)
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    return app
