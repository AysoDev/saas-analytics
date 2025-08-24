import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
  overlayClickClose?: boolean
  className?: string
}

export interface ModalHeaderProps {
  children: ReactNode
  className?: string
  onClose?: () => void
  showCloseButton?: boolean
}

export interface ModalBodyProps {
  children: ReactNode
  className?: string
}

export interface ModalFooterProps {
  children: ReactNode
  className?: string
}