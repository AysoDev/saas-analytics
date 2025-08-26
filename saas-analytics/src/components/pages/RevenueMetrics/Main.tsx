'use client'

import { TrendingUp, TrendingDown, Users, Clock, Repeat, Target } from 'lucide-react'
import { RevenueMetricsProps } from './Types'
import { MetricCard } from './MetricCard'
import './Main.css'

export const RevenueMetrics = ({ data }: RevenueMetricsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const calculateMetrics = () => {
    const totalCustomers = data.plansData.reduce((sum, plan) => sum + plan.customers, 0)
    const payingCustomers = data.plansData.filter(p => p.plan !== 'free').reduce((sum, plan) => sum + plan.customers, 0)
    const conversionRate = (payingCustomers / totalCustomers) * 100
    const customerGrowth = (
                                ((data.monthlyData[data.monthlyData.length - 1]?.customers || 0) -
                                (data.monthlyData[0]?.customers || 0)) /
                                (data.monthlyData[0]?.customers || 1) * 100
                            ).toFixed(2)

    return {
      totalCustomers,
      payingCustomers,
      conversionRate,
      customerGrowth,
      renewalRate: 100 - data.churnRate,
      revenuePerCustomer: data.totalRevenue / payingCustomers
    }
  }

  const metrics = calculateMetrics()

  return (
    <div className="revenue-metrics">
      <h3 className="metrics-title">Key Performance Indicators</h3>
      
      <div className="metrics-grid">
        <MetricCard
          title="Customer Churn Rate"
          value={data.churnRate}
          change={-15.3}
          description="Monthly customer churn"
          format="percent"
          icon={<TrendingDown size={20} />}
        />

        <MetricCard
          title="Renewal Rate"
          value={metrics.renewalRate}
          change={2.1}
          description="Customer retention rate"
          format="percent"
          icon={<Repeat size={20} />}
        />

        <MetricCard
          title="LTV"
          value={data.ltv}
          change={8.7}
          description="Lifetime value per customer"
          format="currency"
          icon={<Target size={20} />}
        />

        <MetricCard
          title="Conversion Rate"
          value={metrics.conversionRate}
          change={5.2}
          description="Free to paid conversion"
          format="percent"
          icon={<TrendingUp size={20} />}
        />

        <MetricCard
          title="Customer Growth"
          value={metrics.customerGrowth}
          change={12.8}
          description="Monthly customer growth"
          format="percent"
          icon={<Users size={20} />}
        />

        <MetricCard
          title="Revenue per Customer"
          value={metrics.revenuePerCustomer}
          change={4.3}
          description="Average revenue per paying customer"
          format="currency"
          icon={<Clock size={20} />}
        />
      </div>

      {/* Additional insights */}
      <div className="metrics-insights">
        <h4 className="insights-title">Performance Insights</h4>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-header">
              <TrendingUp size={16} />
              <span>Growth Trend</span>
            </div>
            <p className="insight-text">
              Revenue has grown by {data.growthRate}% over the last 12 months, 
              with {metrics.payingCustomers.toLocaleString()} paying customers.
            </p>
          </div>

          <div className="insight-card">
            <div className="insight-header">
              <Target size={16} />
              <span>Plan Distribution</span>
            </div>
            <p className="insight-text">
              Premium plan contributes ${data.plansData.find(p => p.plan === 'premium')?.revenue.toLocaleString()} 
              ({((data.plansData.find(p => p.plan === 'premium')?.revenue || 0) / data.totalRevenue * 100).toFixed(1)}%) of total revenue.
            </p>
          </div>

          <div className="insight-card">
            <div className="insight-header">
              <Repeat size={16} />
              <span>Retention</span>
            </div>
            <p className="insight-text">
              {metrics.renewalRate}% of customers renew their subscriptions monthly, 
              with a churn rate of {data.churnRate}%.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}