'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Plus, 
  Download, 
  Filter,
  Search
} from 'lucide-react'
import { Customer, CustomersFilters, CustomersStats } from './Types'
import { CustomerTable } from '@/components/pages/CustomerTable/Main'
import { CustomerFilters } from '../CustomerFilter/Main'
import { Metric } from '@/components/widgets/Metric/Main'
import { Card } from '@/components/widgets/Card/Main'
import './Main.css'

export const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [stats, setStats] = useState<CustomersStats>({
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0,
    churnRate: 0,
    mrr: 0
  })
  const [filters, setFilters] = useState<CustomersFilters>({
    status: [],
    plan: [],
    search: '',
    dateRange: {
      start: '',
      end: ''
    }
  })
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadCustomers()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, customers])

  const loadCustomers = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      const mockData = await mockFetchCustomers()
      setCustomers(mockData)
      calculateStats(mockData)
    } catch (error) {
      console.error('Failed to load customers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (data: Customer[]) => {
    const total = data.length
    const active = data.filter(c => c.status === 'active').length
    const inactive = data.filter(c => c.status === 'inactive').length
    const pending = data.filter(c => c.status === 'pending').length
    const mrr = data.reduce((sum, customer) => {
      const planValue = {
        free: 0,
        basic: 29,
        premium: 99,
        enterprise: 299
      }[customer.plan]
      return sum + planValue
    }, 0)
    const churnRate = (inactive / total) * 100

    setStats({ total, active, inactive, pending, mrr, churnRate })
  }

  const applyFilters = () => {
    let filtered = customers

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.company.toLowerCase().includes(searchTerm)
      )
    }

    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(customer =>
        filters.status.includes(customer.status)
      )
    }

    // Apply plan filter
    if (filters.plan.length > 0) {
      filtered = filtered.filter(customer =>
        filters.plan.includes(customer.plan)
      )
    }

    setFilteredCustomers(filtered)
  }

  const handleFilterChange = (newFilters: Partial<CustomersFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleClearFilters = () => {
    setFilters({
      status: [],
      plan: [],
      search: '',
      dateRange: { start: '', end: '' }
    })
  }

  const mockFetchCustomers = async (): Promise<Customer[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@acme.com',
        company: 'Acme Inc',
        status: 'active',
        phone: '+1 (555) 123-4567',
        createdAt: '2023-01-15',
        lastLogin: '2024-01-20',
        plan: 'premium',
        revenue: 299,
        location: 'New York, USA',
        avatar: '/users/user1.jpg'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@globex.com',
        company: 'Globex Corporation',
        status: 'active',
        phone: '+1 (555) 987-6543',
        createdAt: '2023-02-20',
        lastLogin: '2024-01-19',
        plan: 'enterprise',
        revenue: 299,
        location: 'San Francisco, USA',
        avatar: '/users/user2.jpg'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@wayne.com',
        company: 'Wayne Enterprises',
        status: 'pending',
        phone: '+1 (555) 456-7890',
        createdAt: '2024-01-05',
        lastLogin: '2024-01-18',
        plan: 'basic',
        revenue: 29,
        location: 'Chicago, USA',
        avatar: '/users/user3.jpg'
      },
      {
        id: '4',
        name: 'Ethan Collins',
        email: 'ethan@stark.com',
        company: 'Stark Industries',
        status: 'inactive',
        phone: '+1 (555) 321-0987',
        createdAt: '2023-11-10',
        lastLogin: '2023-12-15',
        plan: 'premium',
        revenue: 99,
        location: 'Los Angeles, USA',
        avatar: '/users/user4.jpg'
      },
      {
        id: '5',
        name: 'Charlie Wilson',
        email: 'charlie@oscorp.com',
        company: 'Oscorp',
        status: 'active',
        phone: '+1 (555) 765-4321',
        createdAt: '2023-08-22',
        lastLogin: '2024-01-20',
        plan: 'enterprise',
        revenue: 299,
        location: 'Boston, USA',
        avatar: '/users/user5.jpg'
      }
    ]
  }

  return (
    <div className="customers-page">
      {/* Header */}
      <div className="customers-header">
        <div className="customers-title-section">
          <Users className="customers-icon" size={32} />
          <div>
            <h1 className="customers-title">Customers</h1>
            <p className="customers-subtitle">Manage your customer accounts</p>
          </div>
        </div>
        <div className="customers-actions">
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="customers-stats">
        <Metric
          title="Total Customers"
          value={stats.total}
          icon={<Users size={20} />}
        />
        <Metric
          title="Active Customers"
          value={stats.active}
          change={+12.5}
          icon={<Users size={20} />}
        />
        <Metric
          title="MRR"
          value={stats.mrr}
          change={+8.2}
          icon={<Users size={20} />}
          format="currency"
        />
      </div>

      {/* Filters */}
      <Card>
        <div className="filters-header">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              className="search-input"
            />
          </div>
          <button
            className={`btn btn-outline ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
            {filters.status.length > 0 || filters.plan.length > 0 ? (
              <span className="filter-badge">
                {filters.status.length + filters.plan.length}
              </span>
            ) : null}
          </button>
        </div>

        {showFilters && (
          <CustomerFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        )}
      </Card>

      {/* Customers Table */}
      <Card>
        <Card.Header>
          <Card.Title>
            Customer List {filteredCustomers.length > 0 && `(${filteredCustomers.length})`}
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <CustomerTable
            customers={filteredCustomers}
            isLoading={isLoading}
            onRefresh={loadCustomers}
          />
        </Card.Content>
      </Card>
    </div>
  )
}