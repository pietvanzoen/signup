from .base_view import ApiBaseView
from . import models


class Schedules(ApiBaseView):
    url = 'schedules'
    methods = ('GET', 'POST')

    def get(self):
        schedules = {"schedules": [s.todict() for s in models.Schedule.get()]}
        return schedules

    def post(self, payload):
        schedule = models.Schedule.put(**payload)
        return '', 201, {'Location': self.url_for('schedules/<int:id>', id=schedule.id)}


class Schedule(ApiBaseView):
    url = 'schedules/<int:id>'

    def get(self, id):
        return models.Schedule.get(id)
