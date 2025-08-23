'use client'

import { useEffect, useState } from 'react'
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
import Link from 'next/link'

export const Sidenav = ({ isOpen, onToggle }: SidenavProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      href: '/dashboard/customers',
      badge: 12,
    },
    {
      id: 'revenue',
      label: 'Revenue',
      icon: <DollarSign size={20} />,
      href: '/dashboard/revenue',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      href: '/dashboard/settings',
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: <HelpCircle size={20} />,
      href: '/help',
    },
  ];

  // Only derive current on client
  const current = mounted
    ? (navItems.find(item => pathname === item.href)?.id ?? 'dashboard')
    : null;

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
                <Link
                  href={item.href}
                  className={`sidenav-link${mounted && current === item.id ? ' active' : ''}`}
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
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidenav-footer">
          <Link href="/logout" className="sidenav-link">
            <span className="sidenav-icon"><LogOut size={20} /></span>
            {isOpen && <span className="sidenav-label">Logout</span>}
          </Link>
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