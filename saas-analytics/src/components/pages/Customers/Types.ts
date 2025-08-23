export interface Customer {
  id: string
  name: string
  email: string
  company: string
  status: 'active' | 'inactive' | 'pending'
  phone: string
  createdAt: string
  lastLogin: string
  plan: 'free' | 'basic' | 'premium' | 'enterprise'
  revenue: number
  location: string
  avatar: string
}

export interface CustomersFilters {
  status: string[]
  plan: string[]
  search: string
  dateRange: {
    start: string
    end: string
  }
}

export interface CustomersStats {
  total: number
  active: number
  inactive: number
  pending: number
  churnRate: number
  mrr: number
}