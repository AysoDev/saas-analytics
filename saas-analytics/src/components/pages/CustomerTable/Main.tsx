'use client'

import { useState } from 'react'
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users
} from 'lucide-react'
import { Customer } from '../Customers/Types'
import './Main.css'
import { CustomerDetailsModal } from './CustomerDetails/Main'

interface CustomerTableProps {
  customers: Customer[]
  isLoading: boolean
  onRefresh: () => void
}

export const CustomerTable = ({ customers, isLoading, onRefresh }: CustomerTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalPages = Math.ceil(customers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCustomers = customers.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (customer: Customer) => {
    console.log('Delete customer:', customer)
  }

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsModalOpen(true)
  }

  const handleSave = (updatedCustomer: Customer) => {
    // TODO: Implement customer update logic in parent and pass handler via props
    setSelectedCustomer(updatedCustomer)
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      active: { color: 'success', label: 'Active' },
      inactive: { color: 'error', label: 'Inactive' },
      pending: { color: 'warning', label: 'Pending' }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default', label: status }

    return (
      <span className={`status-badge status-${config.color}`}>
        {config.label}
      </span>
    )
  }

  const PlanBadge = ({ plan }: { plan: string }) => {
    const planConfig = {
      free: { color: 'default', label: 'Free' },
      basic: { color: 'primary', label: 'Basic' },
      premium: { color: 'premium', label: 'Premium' },
      enterprise: { color: 'enterprise', label: 'Enterprise' }
    }

    const config = planConfig[plan as keyof typeof planConfig] || { color: 'default', label: plan }

    return (
      <span className={`plan-badge plan-${config.color}`}>
        {config.label}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="table-loading">
        <RefreshCw className="animate-spin" size={24} />
        <span>Loading customers...</span>
      </div>
    )
  }

  if (customers.length === 0) {
    return (
      <div className="table-empty">
        <Users size={48} />
        <h3>No customers found</h3>
        <p>Try adjusting your search or filters</p>
        <button className="btn btn-primary" onClick={onRefresh}>
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>
    )
  }

  return (
    <div className="customer-table">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Company</th>
              <th>Status</th>
              <th>Plan</th>
              <th>Location</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <div className="customer-info">
                    <div className="customer-avatar">
                      <img src={customer.avatar} alt={customer.name} />
                    </div>
                    <div className="customer-details">
                      <div className="customer-name">{customer.name}</div>
                      <div className="customer-email">{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td>{customer.company}</td>
                <td>
                  <StatusBadge status={customer.status} />
                </td>
                <td>
                  <PlanBadge plan={customer.plan} />
                </td>
                <td>{customer.location}</td>
                <td>{new Date(customer.lastLogin).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="action-btn"
                      onClick={() => handleView(customer)}
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="action-btn danger"
                      onClick={() => handleDelete(customer)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
      <CustomerDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        onSave={handleSave}
        mode="view"
      />
    </div>
  )
}