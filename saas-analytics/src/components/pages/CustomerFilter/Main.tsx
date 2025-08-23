'use client'

import { X } from 'lucide-react'
import { CustomerFiltersProps } from './Types'
import './Main.css'

export const CustomerFilters = ({ filters, onFilterChange, onClearFilters }: CustomerFiltersProps) => {
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ]

  const planOptions = [
    { value: 'free', label: 'Free' },
    { value: 'basic', label: 'Basic' },
    { value: 'premium', label: 'Premium' },
    { value: 'enterprise', label: 'Enterprise' }
  ]

  const handleStatusChange = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status]
    
    onFilterChange({ status: newStatus })
  }

  const handlePlanChange = (plan: string) => {
    const newPlan = filters.plan.includes(plan)
      ? filters.plan.filter(p => p !== plan)
      : [...filters.plan, plan]
    
    onFilterChange({ plan: newPlan })
  }

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    onFilterChange({
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    })
  }

  const hasActiveFilters = filters.status.length > 0 || filters.plan.length > 0 || 
                          filters.dateRange.start || filters.dateRange.end

  return (
    <div className="customer-filters">
      <div className="filters-header">
        <h3 className="filters-title">Filters</h3>
        {hasActiveFilters && (
          <button className="clear-filters" onClick={onClearFilters}>
            <X size={16} />
            Clear all
          </button>
        )}
      </div>

      <div className="filters-grid">
        {/* Status filter */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <div className="filter-options">
            {statusOptions.map(option => (
              <label key={option.value} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.status.includes(option.value)}
                  onChange={() => handleStatusChange(option.value)}
                  className="filter-checkbox-input"
                />
                <span className="filter-checkbox-custom"></span>
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Plan filter */}
        <div className="filter-group">
          <label className="filter-label">Plan</label>
          <div className="filter-options">
            {planOptions.map(option => (
              <label key={option.value} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.plan.includes(option.value)}
                  onChange={() => handlePlanChange(option.value)}
                  className="filter-checkbox-input"
                />
                <span className="filter-checkbox-custom"></span>
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Date range filter */}
        <div className="filter-group">
          <label className="filter-label">Date Range</label>
          <div className="date-range-filters">
            <div className="date-input-group">
              <label className="date-label">From</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="date-input"
              />
            </div>
            <div className="date-input-group">
              <label className="date-label">To</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="date-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active filters chips */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Active filters:</span>
          <div className="filter-chips">
            {filters.status.map(status => {
              const label = statusOptions.find(opt => opt.value === status)?.label || status
              return (
                <span key={status} className="filter-chip">
                  Status: {label}
                  <button
                    onClick={() => handleStatusChange(status)}
                    className="filter-chip-remove"
                  >
                    <X size={12} />
                  </button>
                </span>
              )
            })}
            {filters.plan.map(plan => {
              const label = planOptions.find(opt => opt.value === plan)?.label || plan
              return (
                <span key={plan} className="filter-chip">
                  Plan: {label}
                  <button
                    onClick={() => handlePlanChange(plan)}
                    className="filter-chip-remove"
                  >
                    <X size={12} />
                  </button>
                </span>
              )
            })}
            {filters.dateRange.start && (
              <span className="filter-chip">
                From: {new Date(filters.dateRange.start).toLocaleDateString()}
                <button
                  onClick={() => handleDateRangeChange('start', '')}
                  className="filter-chip-remove"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.dateRange.end && (
              <span className="filter-chip">
                To: {new Date(filters.dateRange.end).toLocaleDateString()}
                <button
                  onClick={() => handleDateRangeChange('end', '')}
                  className="filter-chip-remove"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}