class OneNoteHtmlMapper:
    def __init__(self, document):
        self.document = document

    def get_html(self):
        return self.document.outer_html()
