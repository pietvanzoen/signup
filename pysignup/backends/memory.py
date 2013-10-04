from collections import OrderedDict

from . import base


class MemoryStore(type):
    def __new__(cls, name, bases, namespace, **kwargs):
        result = type.__new__(cls, name, bases, namespace)
        result._store = OrderedDict()
        return result


class MemoryModelMixin(metaclass=MemoryStore):
    @classmethod
    def get(cls, id=None):
        if id is None:
            return cls._store.values()
        elif id in cls._store:
            return cls._store[id]
        else:
            raise base.NotFound("{} not found".format(id))

    @classmethod
    def put(cls, *args, **kwargs):
        kwargs['id'] = len(cls._store) + 1
        self = super().put(*args, **kwargs)
        cls._store[id] = self
        return self


class Schedule(MemoryModelMixin, base.Schedule):
    pass


class ScheduleDate(MemoryModelMixin, base.ScheduleDate):
    pass


class ScheduleSignup(MemoryModelMixin, base.ScheduleSignup):
    pass
