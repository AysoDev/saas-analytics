'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/widgets/Card/Main';
import { Chart } from '@/components/widgets/Chart/Main';
import { DashboardData } from './Types';
import './Main.css';
import { Suspense } from 'react';
import MetricCards from './Metrics';

export const Dashboard = () => {
  const [data, setData] = useState<DashboardData>();

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      const mockData: DashboardData = {
        totalRevenue: 124563,
        newUsers: 2453,
        conversions: 12.4,
        churnRate: 2.3,
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Revenue',
              data: [65000, 59000, 80000, 81000, 56000, 55000, 72000, 98000, 102000, 115000, 124000, 142000],
              backgroundColor: 'var(--chart-1)'
            },
            {
              label: 'Users',
              data: [1000, 1200, 1300, 1200, 1500, 1800, 2000, 2300, 2450, 2600, 2800, 3000],
              backgroundColor: 'var(--chart-2)'
            }
          ]
        }
      }
      setData(mockData)
    }

    fetchData()
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="dashboard-description">
          Welcome to your analytics dashboard
        </p>
      </div>

      <div className="dashboard-metrics">
        <MetricCards />
      </div>

      <div className="dashboard-content">
        <Card className="dashboard-chart">
          <Card.Header>
            <Card.Title>Performance Overview</Card.Title>
          </Card.Header>
          <Card.Content>
            <Chart data={data?.chartData ?? { labels: [], datasets: [] }} type="bar" height={350} />
          </Card.Content>
        </Card>

        <div className="dashboard-sidebar">
          <Card>
            <Card.Header>
              <Card.Title>Recent Activity</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p>New user registered</p>
                    <span>2 minutes ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p>Subscription upgraded</p>
                    <span>15 minutes ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p>Payment received</p>
                    <span>1 hour ago</span>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}