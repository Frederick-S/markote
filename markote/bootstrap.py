from flask import Flask
from config import config
from markote.views.home import home_blueprint
from markote.views.auth import auth_blueprint
from markote.views.notes import notes_blueprint
from markote.views.error import error_blueprint
from markote.api.api_blueprint import api_blueprint
import markote.api.api_bootstrap
from markote.login_manager import login_manager
from markote.oauth import oauth


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)

    login_manager.init_app(app)
    oauth.init_app(app)

    app.register_blueprint(home_blueprint)
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(notes_blueprint)
    app.register_blueprint(error_blueprint)
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    return app
