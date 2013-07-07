from .base_view import ApiBaseView
from . import models


class Schedules(ApiBaseView):
    url = 'schedules'
    methods = ('GET', 'POST')

    def get(self):
        schedules = [
            {"description": s.description, "id": s.id}
            for s in models.Schedule.get()
        ]
        return schedules

    def post(self, payload):
        schedule = models.Schedule.put(**payload)
        #FIXME uncomment once schedule view is implemented
        #return '', 201, {'Location': self.url_for('schedule', schedule_id)}
        return str(schedule.id), 201, {'Location': 'lolwat'}
