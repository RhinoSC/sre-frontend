export interface BidDTO {
  bidname: string;
  goal: number;
  current_amount: number;
  description: string;
  type: string;
  create_new_options: boolean;
  bid_options: BidOption[];
}

export interface BidOption {
  name: string;
  current_amount: number;
}