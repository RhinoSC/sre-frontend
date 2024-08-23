import type { Team } from "./team";
import type { BidDTO } from "./bid";

export interface Run {
  id: string;
  name: string;
  start_time_mili: number;
  estimate_string: string;
  estimate_mili: number;
  setup_time_mili: number;
  status: string;
  run_metadata: RunMetadata;
  teams: Team[];
  schedule_id: string;
}

export interface RunMetadata {
  category: string;
  platform: string;
  twitch_game_name: string;
  run_name: string;
  note: string;
}

export interface RunDTO {
  name: string;
  start_time_mili: number;
  estimate_string: string;
  estimate_mili: number;
  setup_time_mili: number;
  status: string;
  run_metadata: RunMetadata;
  teams: TeamDTO[];
  bids: BidDTO[];
  schedule_id: string;
}
