'use client'

import { useState } from 'react';
import { Header } from '@/components/pages/Header/Main';
import { Sidenav } from '@/components/pages/Sidenav/Main';
import './theme.css';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidenavOpen, setSidenavOpen] = useState(true)

  const toggleSidenav = () => {
    setSidenavOpen(!isSidenavOpen)
  }

  return (
    <>
      <div className='dashboard-container'>
        <Sidenav isOpen={isSidenavOpen} onToggle={toggleSidenav} />
        <div className={`layout-content ${isSidenavOpen ? 'sidenav-open' : 'sidenav-closed'}`}>
            <Header onMenuToggle={toggleSidenav} />
            <main className="container mx-auto p-4">
                {children}
            </main>
        </div>
      </div>
    </>
  )
}