export interface Schedule {
  id: string;
  name: string;
  start_time_mili: number;
  end_time_mili: number;
  event_id: string;
  runs: ScheduleRunId[];
}

export interface ScheduleRunId {
  id: string;
}

export interface ScheduleDTO {
  name:            string;
  start_time_mili: number;
  end_time_mili:   number;
  event_id:        string;
}
