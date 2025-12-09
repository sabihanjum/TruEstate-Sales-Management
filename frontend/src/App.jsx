import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import TransactionTable from './components/TransactionTable';
import Pagination from './components/Pagination';
import { useSales } from './hooks/useSales';

function App() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
  const [search, setSearch] = useState('');

  // Combine all params for the hook
  const activeParams = {
    ...filters,
    search: search,
    ordering: sortConfig.direction === 'ascending' ? sortConfig.key : `-${sortConfig.key}`
  };

  const { data, count, loading, error } = useSales(activeParams, page);
  const totalPages = Math.ceil(count / 10);

  const handleSearch = (term) => {
    setSearch(term);
    setPage(1); // Reset to first page
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSort = (config) => {
    setSortConfig(config);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, display: 'flex' }}>
        <FilterPanel filters={filters} onChange={handleFilterChange} />
        
        <div style={{ flex: 1, padding: '2rem', background: '#f8fafc' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SearchBar onSearch={handleSearch} />
            <div style={{ color: '#666' }}>
              Showing {data.length} of {count} transactions
            </div>
          </div>

          {error && <div style={{ color: 'red', padding: '1rem' }}>Error: {error}</div>}
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Loading transactions...</div>
          ) : (
            <>
              <TransactionTable 
                transactions={data} 
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <Pagination 
                currentPage={page} 
                onPageChange={setPage} 
                hasNext={page < totalPages} 
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
