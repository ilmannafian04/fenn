export interface PollOption {
  id: number;
  name: string;
}

export default interface Poll {
  id: number;
  title: string;
  options: PollOption[];
  createdAt: Date;
}
