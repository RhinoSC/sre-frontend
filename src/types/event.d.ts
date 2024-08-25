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
