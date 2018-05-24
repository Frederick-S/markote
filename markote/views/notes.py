from flask import render_template, Blueprint
from markote.login_manager import login_required

notes_blueprint = Blueprint('notes_blueprint', __name__)


@notes_blueprint.route('/notes')
@login_required
def notes():
    return render_template('notes.html')
