from flask import Flask
from onemark.views.home import home_blueprint
from onemark.views.login import login_blueprint
from onemark.views.notes import notes_blueprint
from config import config


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)

    app.register_blueprint(home_blueprint)
    app.register_blueprint(login_blueprint)
    app.register_blueprint(notes_blueprint)

    return app
