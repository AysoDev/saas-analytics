import { RevenueData } from '../revenue/Types'

export interface RevenueMetricsProps {
  data: RevenueData
}

export interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  description?: string
  format?: 'currency' | 'number' | 'percent'
  icon?: React.ReactNode
}