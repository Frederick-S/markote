from flask import Flask
from config import config
from onemark.views.home import home_blueprint
from onemark.views.auth import auth_blueprint
from onemark.views.notes import notes_blueprint
from onemark.views.error import error_blueprint
from onemark.api.api import api_blueprint
from onemark.login_manager import login_manager
from onemark.microsoft_graph import microsoft_graph


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)

    login_manager.init_app(app)
    microsoft_graph.init_app(app)

    app.register_blueprint(home_blueprint)
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(notes_blueprint)
    app.register_blueprint(error_blueprint)
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    return app
