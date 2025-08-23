export interface MetricProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  format?: 'number' | 'currency' | 'percent';
  currency?: string;
}