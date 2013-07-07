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
        schedule.dates = [ScheduleDate.put(schedule, d) for d in dates]

        return schedule


class ScheduleDate(BaseModel):
    def __init__(self, schedule, date, signups=()):
        self.schedule = schedule
        self.date = date
        self.signups = signups

    @classmethod
    def put(cls, schedule, date, signups=()):
        return cls(schedule, date, signups)


class ScheduleSignup(BaseModel):
    def __init__(self, schedule_date, user):
        self.schedule_date = schedule_date
        self.user = user

    @classmethod
    def put(cls, schedule_date, user):
        return cls(schedule_date, user)
