from flask import Flask
from onemark.views.home import home_blueprint
from config import config


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)

    app.register_blueprint(home_blueprint)

    return app
