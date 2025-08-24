'use client'

import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Calendar, 
  Clock,
  Edit,
  Save,
  X
} from 'lucide-react'
import { Modal } from '@/components/widgets/Modal/Main'
import type { Customer } from '../../Customers/Types'
import './Main.css'

interface CustomerDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  customer: Customer | null
  onSave: (customer: Customer) => void
  mode: 'view' | 'edit'
}

export const CustomerDetailsModal = ({ 
  isOpen, 
  onClose, 
  customer, 
  onSave, 
  mode = 'view' 
}: CustomerDetailsModalProps) => {
  const [editMode, setEditMode] = useState(mode)
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(customer)

  const handleSave = () => {
    if (editedCustomer) {
      onSave(editedCustomer)
      setEditMode('view')
    }
  }

  const handleCancel = () => {
    setEditedCustomer(customer)
    setEditMode('view')
  }

  const handleInputChange = (field: keyof Customer, value: string) => {
    if (editedCustomer) {
      setEditedCustomer(prev => ({
        ...prev!,
        [field]: value
      }))
    }
  }

  if (!customer) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Header onClose={onClose}>
        <h2 className="modal-title">
          {editMode === 'view' ? 'Customer Details' : 'Edit Customer'}
        </h2>
        <p className="modal-subtitle">
          {editMode === 'view' ? 'View and manage customer information' : 'Update customer details'}
        </p>
      </Modal.Header>

      <Modal.Body>
        <div className="customer-details-content">
          {/* Avatar and basic info */}
          <div className="customer-profile-header">
            <div className="customer-avatar-large">
              <img src={customer.avatar} alt={customer.name} />
            </div>
            <div className="customer-basic-info">
              {editMode === 'view' ? (
                <>
                  <h3 className="customer-name-large">{customer.name}</h3>
                  <p className="customer-email-large">{customer.email}</p>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={editedCustomer?.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="edit-input large"
                    placeholder="Customer name"
                  />
                  <input
                    type="email"
                    value={editedCustomer?.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="edit-input"
                    placeholder="Email address"
                  />
                </>
              )}
            </div>
          </div>

          {/* Details grid */}
          <div className="customer-details-grid">
            <div className="detail-item">
              <div className="detail-icon">
                <Building size={16} />
              </div>
              <div className="detail-content">
                <label className="detail-label">Company</label>
                {editMode === 'view' ? (
                  <span className="detail-value">{customer.company}</span>
                ) : (
                  <input
                    type="text"
                    value={editedCustomer?.company || ''}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="edit-input"
                    placeholder="Company name"
                  />
                )}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <Phone size={16} />
              </div>
              <div className="detail-content">
                <label className="detail-label">Phone</label>
                {editMode === 'view' ? (
                  <span className="detail-value">{customer.phone}</span>
                ) : (
                  <input
                    type="tel"
                    value={editedCustomer?.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="edit-input"
                    placeholder="Phone number"
                  />
                )}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <MapPin size={16} />
              </div>
              <div className="detail-content">
                <label className="detail-label">Location</label>
                {editMode === 'view' ? (
                  <span className="detail-value">{customer.location}</span>
                ) : (
                  <input
                    type="text"
                    value={editedCustomer?.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="edit-input"
                    placeholder="Location"
                  />
                )}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <Calendar size={16} />
              </div>
              <div className="detail-content">
                <label className="detail-label">Member Since</label>
                <span className="detail-value">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <Clock size={16} />
              </div>
              <div className="detail-content">
                <label className="detail-label">Last Login</label>
                <span className="detail-value">
                  {new Date(customer.lastLogin).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <Mail size={16} />
              </div>
              <div className="detail-content">
                <label className="detail-label">Status</label>
                {editMode === 'view' ? (
                  <span className={`status-badge status-${customer.status}`}>
                    {customer.status}
                  </span>
                ) : (
                  <select
                    value={editedCustomer?.status || ''}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="edit-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                )}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <Building size={16} />
              </div>
              <div className="detail-content">
                <label className="detail-label">Plan</label>
                {editMode === 'view' ? (
                  <span className={`plan-badge plan-${customer.plan}`}>
                    {customer.plan}
                  </span>
                ) : (
                  <select
                    value={editedCustomer?.plan || ''}
                    onChange={(e) => handleInputChange('plan', e.target.value)}
                    className="edit-select"
                  >
                    <option value="free">Free</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {editMode === 'view' ? (
          <>
            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setEditMode('edit')}
            >
              <Edit size={16} />
              Edit Customer
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              <X size={16} />
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
            >
              <Save size={16} />
              Save Changes
            </button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  )
}