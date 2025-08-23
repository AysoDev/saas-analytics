export interface DashboardData {
  totalRevenue: number;
  newUsers: number;
  conversions: number;
  churnRate: number;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}