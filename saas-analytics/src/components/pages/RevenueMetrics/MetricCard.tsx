'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { MetricCardProps } from './Types'
import './Main.css'

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  description, 
  format = 'number', 
  icon 
}: MetricCardProps) => {
  const formatValue = () => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(Number(value))
    } else if (format === 'percent') {
      return `${value}%`
    }
    return new Intl.NumberFormat('en-US').format(Number(value))
  }

  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-title-section">
          <h4 className="metric-title">{title}</h4>
          {description && (
            <p className="metric-description">{description}</p>
          )}
        </div>
        {icon && (
          <div className="metric-icon">
            {icon}
          </div>
        )}
      </div>

      <div className="metric-content">
        <div className="metric-value">{formatValue()}</div>
        {change !== undefined && (
          <div className={`metric-change ${change >= 0 ? 'positive' : 'negative'}`}>
            {change >= 0 ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="metric-trend">
          <div 
            className={`trend-bar ${change >= 0 ? 'positive' : 'negative'}`}
            style={{ width: `${Math.min(Math.abs(change), 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  )
}