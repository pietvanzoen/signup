* pysignup is in a troubling spot where the pluggable backends are causing
  trouble. Schedule needs to be able to call into the specific backend for
  ScheduleDate - not just the base implementation.
