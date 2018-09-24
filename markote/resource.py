class Resource(object):
    """
    Represents a resource file in OneNote page.
    """
    def __init__(self, name, file, content_type):
        self.name = name
        self.file = file
        self.content_type = content_type
