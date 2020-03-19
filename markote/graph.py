class Graph(object):
    NAME = 'microsoft_graph'

    API_BASE_URL = 'https://graph.microsoft.com/v1.0/'

    ACCESS_TOKEN_URL = \
        'https://login.microsoftonline.com/common/oauth2/v2.0/token'

    REFRESH_TOKEN_URL = \
        'https://login.microsoftonline.com/common/oauth2/v2.0/token'

    AUTHORIZE_URL = \
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'

    SCOPE = 'User.Read Notes.ReadWrite Files.ReadWrite offline_access'
