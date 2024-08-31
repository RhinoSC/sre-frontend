export interface MyEvent {
  id: string;
  name: string;
  start_time_mili: number;
  end_time_mili: number;
}

export interface MyEventDTO {
  name: string;
  start_time_mili: number;
  end_time_mili: number;
}

export interface EventInfoCount {
  schedules: number;
  runs:      number;
  prizes:    number;
  bids:      number;
  donations: number;
  users:     number;
}
