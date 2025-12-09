import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  return (
    <div style={{ position: 'relative', maxWidth: '400px' }}>
      <Search 
        size={20} 
        style={{ 
          position: 'absolute', 
          left: '10px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          color: '#666'
        }} 
      />
      <input
        type="text"
        placeholder="Search by name or phone..."
        onChange={(e) => onSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 0.75rem 0.75rem 2.5rem',
          fontSize: '1rem'
        }}
      />
    </div>
  );
};

export default SearchBar;
