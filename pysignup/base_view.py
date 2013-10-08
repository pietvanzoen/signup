from flask import json, make_response, request, url_for
from flask.views import View


class ApiBaseView(View):
    url = 'undefined'
    methods = ('GET',)

    @staticmethod
    def url_for(url, *args, **kwargs):
        """Wrap flask's url_for method"""
        return url_for(url, *args, **kwargs)

    def dispatch_request(self, **kwargs):
        method = request.method.lower()
        if method in ('post', 'put'):
            # Pass incoming payloads to POST and PUT methods
            response = getattr(self, method)(request.get_json())
        else:
            # Don't pass anything to GET and DELETE methods
            response = getattr(self, method)(**kwargs)

        if isinstance(response, (dict, list)):
            # If the response looks like JSON (dict or list) - make it JSON
            response = json.jsonify(response)
        elif hasattr(response, 'todict'):
            # Response quacks like a JSONifiable object
            response = json.jsonify(response.todict())
        elif isinstance(response, tuple) and len(response) == 3:
            # If the response looks like (response, status, headers),
            # create the flask response object
            response = make_response(response)

        return response
