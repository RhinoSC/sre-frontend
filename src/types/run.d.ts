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
  twitch_game_id: string;
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

export interface TwitchCategory {
  box_art_url: string;
  id: string;
  name: string;
}


export interface TwitchCategoriesResponse {
  data: TwitchCategory[];
  message: string;
}