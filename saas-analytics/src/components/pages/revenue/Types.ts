export interface RevenueData {
  totalRevenue: number
  recurringRevenue: number
  oneTimeRevenue: number
  growthRate: number
  churnRate: number
  arpu: number
  ltv: number
  chartData: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
    }[]
  }
  monthlyData: MonthlyRevenue[]
  plansData: PlanRevenue[]
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  growth: number
  customers: number
}

export interface PlanRevenue {
  plan: string
  revenue: number
  customers: number
  arpu: number
}

export interface RevenueFilters {
  dateRange: {
    start: string
    end: string
  }
  plan: string[]
  metric: 'revenue' | 'customers' | 'arpu'
}