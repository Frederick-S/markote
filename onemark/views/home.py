from flask import render_template, Blueprint


home_blueprint = Blueprint('home_blueprint', __name__)


@home_blueprint.route('/', methods=['GET'])
def home():
    return render_template('home.html')
