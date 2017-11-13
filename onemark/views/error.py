from flask import render_template, Blueprint


error_blueprint = Blueprint('error_blueprint', __name__)


@error_blueprint.route('/error')
def error():
    return render_template('error.html')
