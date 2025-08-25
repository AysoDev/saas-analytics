'use client'

import { useState, useEffect, useRef } from 'react'
import { Sun, Moon, BarChart3, User, Settings } from 'lucide-react'
import './Main.css'
import { Suspense } from 'react'
import PathTracker from '@/components/widgets/PathTracker/Main';
import UserTracker from '@/components/widgets/UserTracker/Main';
import { UserTrackerSkeleton } from '@/components/widgets/UserTracker/Main'

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      setDarkMode(true)
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <PathTracker />
      </div>
      
      <div className="header-right">
        <button 
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="header-actions">
          <button className="header-action">
            <User size={20} />
          </button>
          <button className="header-action">
            <Settings size={20} />
          </button>
          <Suspense fallback={<UserTrackerSkeleton />}>
            <UserTracker />
          </Suspense>
        </div>
      </div>
    </header>
  )
}