from markote.bootstrap import create_app

app = create_app('production')

if __name__ == '__main__':
    app.run()
