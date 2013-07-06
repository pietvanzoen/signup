from flask import Flask
app = Flask(__name__)

BASE_URL = '/api/'


def discover_views():
    """Hackish function to autodiscover views"""
    from .base_view import ApiBaseView
    from . import views

    for viewname in dir(views):
        V = getattr(views, viewname)
        if isinstance(V, type) and issubclass(V, ApiBaseView):
            app.add_url_rule(BASE_URL + V.url, view_func=V.as_view(V.url))

discover_views()
