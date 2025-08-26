'use client'

import { useState, useEffect } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Download,
  Filter,
  Calendar
} from 'lucide-react'
import { RevenueData, RevenueFilters } from './Types'
import { RevenueChart } from '@/components/pages/RevenueChart/Main'
import { RevenueMetrics } from '@/components/pages/RevenueMetrics/Main'
import { Metric } from '@/components/widgets/Metric/Main'
import { Card } from '@/components/widgets/Card/Main'
import './Main.css'

export const Revenue = () => {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null)
  const [filters, setFilters] = useState<RevenueFilters>({
    dateRange: {
      start: '2023-01-01',
      end: '2024-01-01'
    },
    plan: [],
    metric: 'revenue'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRevenueData()
  }, [filters])

  const loadRevenueData = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      const mockData = await mockFetchRevenueData()
      setRevenueData(mockData)
    } catch (error) {
      console.error('Failed to load revenue data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (newFilters: Partial<RevenueFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const mockFetchRevenueData = async (): Promise<RevenueData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      totalRevenue: 124563,
      recurringRevenue: 115000,
      oneTimeRevenue: 9563,
      growthRate: 12.5,
      churnRate: 2.3,
      arpu: 89.45,
      ltv: 2675,
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [85000, 92000, 78000, 95000, 110000, 105000, 120000, 135000, 142000, 156000, 168000, 184000],
            backgroundColor: 'var(--chart-1)'
          },
          {
            label: 'Customers',
            data: [950, 1020, 980, 1100, 1250, 1350, 1450, 1600, 1750, 1900, 2100, 2300],
            backgroundColor: 'var(--chart-2)'
          }
        ]
      },
      monthlyData: [
        { month: 'Jan 2023', revenue: 85000, growth: 8.2, customers: 950 },
        { month: 'Feb 2023', revenue: 92000, growth: 12.5, customers: 1020 },
        { month: 'Mar 2023', revenue: 78000, growth: -5.3, customers: 980 },
        { month: 'Apr 2023', revenue: 95000, growth: 18.7, customers: 1100 },
        { month: 'May 2023', revenue: 110000, growth: 15.8, customers: 1250 },
        { month: 'Jun 2023', revenue: 105000, growth: -4.5, customers: 1350 },
        { month: 'Jul 2023', revenue: 120000, growth: 14.3, customers: 1450 },
        { month: 'Aug 2023', revenue: 135000, growth: 12.5, customers: 1600 },
        { month: 'Sep 2023', revenue: 142000, growth: 5.2, customers: 1750 },
        { month: 'Oct 2023', revenue: 156000, growth: 9.9, customers: 1900 },
        { month: 'Nov 2023', revenue: 168000, growth: 7.7, customers: 2100 },
        { month: 'Dec 2023', revenue: 184000, growth: 9.5, customers: 2300 }
      ],
      plansData: [
        { plan: 'Free', revenue: 0, customers: 500, arpu: 0 },
        { plan: 'Basic', revenue: 36250, customers: 1250, arpu: 29 },
        { plan: 'Premium', revenue: 62370, customers: 630, arpu: 99 },
        { plan: 'Enterprise', revenue: 25943, customers: 87, arpu: 298 }
      ]
    }
  }

  if (isLoading) {
    return (
      <div className="revenue-loading">
        <div className="loading-spinner"></div>
        <span>Loading revenue data...</span>
      </div>
    )
  }

  if (!revenueData) {
    return (
      <div className="revenue-error">
        <span>Failed to load revenue data</span>
        <button className="btn btn-primary" onClick={loadRevenueData}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="revenue-page">
      {/* Header */}
      <div className="revenue-header">
        <div className="revenue-title-section">
          <DollarSign className="revenue-icon" size={32} />
          <div>
            <h1 className="revenue-title">Revenue</h1>
            <p className="revenue-subtitle">Track your revenue performance</p>
          </div>
        </div>
        <div className="revenue-actions">
          <button className="btn btn-primary">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="revenue-filters">
          <div className="filter-group">
            <label className="filter-label">Date Range</label>
            <div className="date-inputs">
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange({
                  dateRange: { ...filters.dateRange, start: e.target.value }
                })}
                className="date-input"
              />
              <span className="date-separator">to</span>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange({
                  dateRange: { ...filters.dateRange, end: e.target.value }
                })}
                className="date-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Metric</label>
            <select
              value={filters.metric}
              onChange={(e) => handleFilterChange({ 
                metric: e.target.value as 'revenue' | 'customers' | 'arpu' 
              })}
              className="filter-select"
            >
              <option value="revenue">Revenue</option>
              <option value="customers">Customers</option>
              <option value="arpu">ARPU</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Plan</label>
            <select
              value={filters.plan[0] || 'all'}
              onChange={(e) => handleFilterChange({ 
                plan: e.target.value === 'all' ? [] : [e.target.value] 
              })}
              className="filter-select"
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Revenue Chart */}
      <div className="revenue-chart-section">
        <Card>
          <Card.Header>
            <Card.Title>Revenue Overview</Card.Title>
            <Card.Description>
              Monthly revenue performance and trends
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <RevenueChart data={revenueData.chartData} metric={filters.metric} />
          </Card.Content>
        </Card>
      </div>

      {/* Additional Metrics */}
      <RevenueMetrics data={revenueData} />

      {/* Revenue Details */}
      <div className="revenue-details-grid">
        {/* Monthly Breakdown */}
        <Card>
          <Card.Header>
            <Card.Title>Monthly Breakdown</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="monthly-table">
              <div className="table-header">
                <span>Month</span>
                <span>Revenue</span>
                <span>Growth</span>
                <span>Customers</span>
              </div>
              {revenueData.monthlyData.map((month) => (
                <div key={month.month} className="table-row">
                  <span className="month">{month.month}</span>
                  <span className="revenue">
                    ${month.revenue.toLocaleString()}
                  </span>
                  <span className={`growth ${month.growth >= 0 ? 'positive' : 'negative'}`}>
                    {month.growth >= 0 ? '+' : ''}{month.growth}%
                  </span>
                  <span className="customers">
                    {month.customers.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Plan Performance */}
        <Card>
          <Card.Header>
            <Card.Title>Plan Performance</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="plan-performance">
              {revenueData.plansData.map((plan) => (
                <div key={plan.plan} className="plan-item">
                  <div className="plan-header">
                    <span className="plan-name">{plan.plan}</span>
                    <span className="plan-revenue">
                      ${plan.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="plan-details">
                    <span className="plan-customers">
                      {plan.customers} customers
                    </span>
                    <span className="plan-arpu">
                      ARPU: ${plan.arpu}
                    </span>
                  </div>
                  <div className="plan-progress">
                    <div 
                      className="progress-bar"
                      style={{ 
                        width: `${(plan.revenue / revenueData.totalRevenue) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}