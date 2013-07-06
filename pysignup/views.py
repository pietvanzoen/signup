from .base_view import ApiBaseView


class Schedules(ApiBaseView):
    url = 'schedules'
    methods = ('GET', 'POST')

    def get(self):
        pass

    def post(self, payload):
        schedule_id = model.Schedule.create(**payload)
        return '', 201, {'Location': self.url_for('schedule', schedule_id)}
