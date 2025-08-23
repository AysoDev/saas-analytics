export interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
}

export interface SidenavProps {
  isOpen: boolean
  onToggle: () => void
}