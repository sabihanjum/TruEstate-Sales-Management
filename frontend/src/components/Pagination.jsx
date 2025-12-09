import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, onPageChange, hasNext }) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'flex-end', 
      gap: '1rem', 
      marginTop: '1.5rem',
      padding: '1rem'
    }}>
      <span style={{ fontSize: '0.875rem', color: '#666' }}>
        Page {currentPage}
      </span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={btnStyle}
        >
          <ChevronLeft size={16} />
        </button>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          style={btnStyle}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const btnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  background: 'white',
  color: '#333'
};

export default Pagination;
