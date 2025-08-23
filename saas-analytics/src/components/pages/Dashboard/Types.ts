export interface DashboardData {
  totalRevenue: number;
  newUsers: number;
  conversions: number;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}

export type DashboardMetrics = Omit<DashboardData, 'chartData'>;
