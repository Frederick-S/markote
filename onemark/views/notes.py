import json
from flask import render_template, Blueprint
from onemark.microsoft_graph import microsoft_graph


notes_blueprint = Blueprint('notes_blueprint', __name__)


@notes_blueprint.route('/notes')
def notes():
    note_books = microsoft_graph.get('me/onenote/notebooks').data.get('value')

    return render_template('notes.html', note_books=note_books)
