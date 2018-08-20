from flask import Flask
from config import configs
from markote.views.auth import auth_blueprint
from markote.views.notes import notes_blueprint
from markote.api.api_blueprint import api_blueprint
from markote.api.api_bootstrap import init_api_routes
from markote.oauth import oauth, register_graph_client


def create_app(config_name):
    config = configs[config_name]
    app = Flask(__name__, template_folder='static/dist', static_folder='static/dist', static_url_path='')
    app.config.from_object(config)

    config.init_app(app)
    oauth.init_app(app)
    init_api_routes()

    register_graph_client(config.GRAPH_CLIENT_ID, config.GRAPH_CLIENT_SECRET)

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(notes_blueprint)
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    return app
