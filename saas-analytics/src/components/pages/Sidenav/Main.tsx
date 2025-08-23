'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  Menu,
  ChevronRight
} from 'lucide-react'
import { SidenavProps, NavItem } from './Types'
import './Main.css'
import Image from 'next/image'

export const Sidenav = ({ isOpen, onToggle }: SidenavProps) => {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState('dashboard')

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <BarChart3 size={20} />,
      href: '/dashboard',
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <Users size={20} />,
      href: '/customers',
      badge: 12,
    },
    {
      id: 'revenue',
      label: 'Revenue',
      icon: <DollarSign size={20} />,
      href: '/revenue',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      href: '/settings',
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: <HelpCircle size={20} />,
      href: '/help',
    },
  ]

  const handleItemClick = (id: string) => {
    setActiveItem(id)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidenav-overlay" onClick={onToggle} />}
      
      {/* Sidenav */}
      <nav className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidenav-header">
          <div className="sidenav-brand">
            <Image
                width={35}
                height={35}
                src={'/aysodev.png'}
                alt='AysoDev Logo'
                className='sidenav-logo'
            />
            {isOpen && <h2 className="sidenav-title">SaaS Analytics</h2>}
          </div>
          { isOpen ? (<button 
            className="sidenav-toggle"
            onClick={onToggle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <ChevronLeft size={20} />
          </button>) : null }
          { isOpen ? null : (<button
            className='toggle'
            onClick={onToggle}
            aria-label='Open Menu'
          >
            <ChevronRight size={18} />
          </button>)}
        </div>

        <div className="sidenav-content">
          <ul className="sidenav-menu">
            {navItems.map((item) => (
              <li key={item.id} className="sidenav-item">
                <a
                  href={item.href}
                  className={`sidenav-link ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span className="sidenav-icon">{item.icon}</span>
                  {isOpen && (
                    <>
                      <span className="sidenav-label">{item.label}</span>
                      {item.badge && (
                        <span className="sidenav-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidenav-footer">
          <a href="/logout" className="sidenav-link">
            <span className="sidenav-icon"><LogOut size={20} /></span>
            {isOpen && <span className="sidenav-label">Logout</span>}
          </a>
        </div>
      </nav>

      {/* Mobile menu button */}
      {!isOpen && (
        <button 
          className="sidenav-floating-toggle"
          onClick={onToggle}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  )
}