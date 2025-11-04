export type TransportMethod = 'bus' | 'motorbike';

export interface Route {
  id: string;
  name: string;
  color: string;
  isDefault?: boolean;
  transportMethod: TransportMethod;
}

export interface CommuteType {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Commute {
  id: string;
  type: string;
  routeId?: string;
  transportMethod: TransportMethod;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  notes?: string;
  date: string;
  targetArrivalTime?: string;
}

export interface TimerState {
  isActive: boolean;
  type: string | null;
  routeId?: string | null;
  transportMethod?: TransportMethod | null;
  startTime: string | null;
  targetArrivalTime?: string | null;
}

export interface PredictionSettings {
  workStartTime: string;
  bufferMinutes: number;
  daysToAnalyze: number;
}
