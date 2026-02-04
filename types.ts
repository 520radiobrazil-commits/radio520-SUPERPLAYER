export interface Station {
  id: string;
  name: string;
  description: string;
  streamUrl: string;
  category: StationCategory;
  imageUrl: string;
  tags: string[];
}

export enum StationCategory {
  POP = 'Pop',
  ROCK = 'Rock',
  JAZZ = 'Jazz',
  ELECTRONIC = 'Electronic',
  CLASSICAL = 'Classical',
  NEWS = 'News',
  LOFI = 'Lofi',
  AMBIENT = 'Ambient'
}

export interface PlayerState {
  isPlaying: boolean;
  currentStation: Station | null;
  volume: number;
  isLoading: boolean;
  error: string | null;
}

export interface AiRecommendation {
  stationId: string;
  djIntro: string;
}

export interface ProgramSlot {
  start: string; // "HH:mm"
  end: string;   // "HH:mm"
  name: string;
}

export interface WeeklySchedule {
  [dayOfWeek: number]: ProgramSlot[]; // 0 = Sunday, 1 = Monday, etc.
}