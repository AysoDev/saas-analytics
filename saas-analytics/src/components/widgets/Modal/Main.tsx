'use client'

import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from './Types'
import './Main.css'

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md', 
  showCloseButton = true,
  overlayClickClose = true,
  className = ''
}: ModalProps) => {
  // Handle escape key press
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (overlayClickClose && event.target === event.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleEscapeKey])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-container modal-${size} ${className}`}>
        {children}
      </div>
    </div>
  )
}

const ModalHeader = ({ 
  children, 
  className = '', 
  onClose, 
  showCloseButton = true 
}: ModalHeaderProps) => {
  return (
    <div className={`modal-header ${className}`}>
      <div className="modal-header-content">
        {children}
      </div>
      {showCloseButton && (
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}

const ModalBody = ({ children, className = '' }: ModalBodyProps) => {
  return (
    <div className={`modal-body ${className}`}>
      {children}
    </div>
  )
}

const ModalFooter = ({ children, className = '' }: ModalFooterProps) => {
  return (
    <div className={`modal-footer ${className}`}>
      {children}
    </div>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export { Modal }