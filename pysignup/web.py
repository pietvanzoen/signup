import os

from flask import Flask, send_from_directory


app = Flask('pysignup')

BASE_URL = '/api/'
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))


@app.route("/assets/<path:filename>")
def get_assets(filename):
    path = os.path.join(BASE_DIR, 'assets')
    return send_from_directory(path, filename)


@app.route("/404.html")
def get_404():
    return send_from_directory(BASE_DIR, '404.html')


@app.route("/")
@app.route("/index.html")
def get_index():
    return send_from_directory(BASE_DIR, 'index.html')


@app.route("/schedule")
@app.route("/schedule.html")
def get_schedule():
    return send_from_directory(BASE_DIR, 'schedule.html')


@app.route("/event")
@app.route("/event.html")
def get_event():
    return send_from_directory(BASE_DIR, 'event.html')


def discover_views():
    """Hackish function to autodiscover views"""
    from .base_view import ApiBaseView
    from . import views

    for viewname in dir(views):
        V = getattr(views, viewname)
        if isinstance(V, type) and issubclass(V, ApiBaseView):
            app.add_url_rule(BASE_URL + V.url, view_func=V.as_view(V.url))

discover_views()
