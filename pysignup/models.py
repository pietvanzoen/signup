import importlib

from .web import app
from .backends import base


_backend_name = app.config.get('BACKEND', 'pysignup.backends.memory')
_backend_module = importlib.import_module(_backend_name)


#XXX Hack to avoid implementing proxies here
def _load_models(module):
    for name in dir(module):
        value = getattr(module, name)
        if isinstance(value, type) and issubclass(value, base.BaseModel):
            #FIXME ugh - find a better way
            globals()[name] = value

_load_models(_backend_module)
