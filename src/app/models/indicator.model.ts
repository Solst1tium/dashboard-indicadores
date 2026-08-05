export type Trend = 'up' | 'down' | 'stable';

export interface Indicator {
  id: number;
  name: string;
  category: string;
  value: number;
  target: number;
  unit: string;
  trend: Trend;
  date: string; // formato ISO
}

export interface KpiSummary {
  label: string;
  value: string;
  change: number; // porcentaje
  icon: string;   // clase de primeicons
}