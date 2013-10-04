class BaseModel:
    pass


class NotFound(Exception):
    pass


class Schedule(BaseModel):
    def __init__(self, id="", name="", description="", dates=()):
        self.id = id
        self.name = name
        self.description = description
        self.dates = dates

    @classmethod
    def put(cls, id="", name="", description="", dates=()):
        # Delay setting dates until we've created ScheduleDate instances
        schedule = cls(id, name, description)

        # Create ScheduleDate instances
        schedule.dates = [ScheduleDate.put(schedule, **d) for d in dates]

        return schedule

    def todict(self):
        """Return a JSON compatible dict representation"""
        return {
            "name": self.name,
            "description": self.description,
            "dates": [d.todict() for d in self.dates],
        }


class ScheduleDate(BaseModel):
    def __init__(self, schedule, date=None, need=None, signups=()):
        assert date, 'Date must be set'
        assert need, 'Need must be set'
        self.schedule = schedule
        self.date = date
        self.need = need
        self.signups = signups

    @classmethod
    def put(cls, schedule, date=None, need=None, signups=()):
        return cls(schedule, date, need, signups)

    def todict(self):
        """Return a JSON compatible dict representation"""
        return {
            "date": self.date,
            "need": self.need,
            "signups": [s.todict() for s in self.signups],
        }


class ScheduleSignup(BaseModel):
    def __init__(self, schedule_date, user):
        self.schedule_date = schedule_date
        self.user = user

    @classmethod
    def put(cls, schedule_date, user):
        return cls(schedule_date, user)

    def todict(self):
        """Return a JSON compatible dict representation"""
        return {"user": self.user}
