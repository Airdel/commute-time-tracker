export interface Commute {
  id: string;
  direction: 'to-work' | 'from-work';
  departureTime: string;
  arrivalTime: string;
  duration: number;
  notes?: string;
  date: string;
}

export interface TimerState {
  isActive: boolean;
  direction: 'to-work' | 'from-work' | null;
  startTime: string | null;
}
