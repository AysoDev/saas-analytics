import { MetricProps } from './Types'
import { ArrowUp, ArrowDown } from 'lucide-react'
import './Main.css'

export const Metric = ({ 
  title, 
  value, 
  change, 
  icon,
  format = 'number',
  currency = 'USD'
}: MetricProps) => {
  const formatValue = () => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(Number(value))
    } else if (format === 'percent') {
      return `${value}%`
    }
    return new Intl.NumberFormat('en-US').format(Number(value))
  }

  return (
    <div className="metric">
      <div className="metric-header">
        <div className="metric-icon">{icon}</div>
        <h3 className="metric-title">{title}</h3>
      </div>
      <div className="metric-content">
        <p className="metric-value">{formatValue()}</p>
        {change !== undefined && (
          <div className={`metric-change ${change >= 0 ? 'positive' : 'negative'}`}>
            {change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

export const MetricSkeleton = () => (
  <div className="metric">
    <div className="metric-header">
      <div className="metric-icon shimmer-bg" style={{width: 32, height: 32, borderRadius: '50%'}} />
      <div className="metric-title shimmer-bg" style={{width: 80, height: 20, borderRadius: 6}} />
    </div>
    <div className="metric-content">
      <div className="metric-value shimmer-bg" style={{width: 60, height: 28, borderRadius: 6}} />
      <div className="metric-change positive">
        <ArrowUp size={14} className="shimmer-bg" style={{borderRadius: '50%'}} />
        <span className="shimmer-bg" style={{width: 32, height: 16, borderRadius: 6, display: 'inline-block'}} />
      </div>
    </div>
  </div>
)