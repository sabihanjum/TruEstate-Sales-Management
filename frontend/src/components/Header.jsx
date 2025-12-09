import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header style={{ 
      padding: '1.25rem 2rem', 
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      backgroundColor: 'white',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ 
        background: 'var(--accent)', 
        padding: '0.5rem', 
        borderRadius: '8px', 
        display: 'flex', 
        color: 'white' 
      }}>
        <LayoutDashboard size={24} />
      </div>
      <div>
        <h1 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '700', 
          color: 'var(--primary)',
          letterSpacing: '-0.025em'
        }}>
          Sabiha Anjum
        </h1>
        <span style={{ 
          fontSize: '0.875rem', 
          color: '#64748b',
          fontWeight: '500' 
        }}>
          Full Stack Developer Assignment
        </span>
      </div>
    </header>
  );
};

export default Header;
