import React from 'react';

const TransactionTable = ({ transactions, sortConfig, onSort }) => {
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    onSort({ key, direction });
  };

  const getSortIndicator = (name) => {
    if (sortConfig.key !== name) return null;
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  if (transactions.length === 0) {
    return (
      <div style={{ 
        padding: '3rem', 
        textAlign: 'center', 
        color: 'var(--secondary)',
        background: 'var(--surface)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        No transactions found matching your criteria.
      </div>
    );
  }

  return (
    <div style={{ 
      overflowX: 'auto', 
      background: 'var(--surface)', 
      border: '1px solid var(--border)', 
      borderRadius: '12px',
      boxShadow: 'var(--shadow-sm)' 
    }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '0.925rem' }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            <th style={thStyle} onClick={() => requestSort('date')}>Date {getSortIndicator('date')}</th>
            <th style={thStyle} onClick={() => requestSort('customer_name')}>Customer {getSortIndicator('customer_name')}</th>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle} onClick={() => requestSort('quantity')}>Qty {getSortIndicator('quantity')}</th>
            <th style={thStyle}>Total</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr key={t.id} style={{ 
              background: index % 2 === 0 ? 'white' : '#fcfcfc',
              transition: 'background 0.2s'
            }} 
            className="hover:bg-slate-50" // Note: This depends on support, doing manual style below
            onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#fcfcfc'}
            >
              <td style={tdStyle}>{t.date}</td>
              <td style={tdStyle}>
                <div style={{ fontWeight: '600', color: 'var(--primary)' }}>{t.customer_name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>{t.customer_region}</div>
              </td>
              <td style={tdStyle}>
                <div style={{ fontWeight: '500' }}>{t.product_name}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.brand}</div>
              </td>
              <td style={tdStyle}>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  background: '#eff6ff', 
                  color: '#2563eb',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  border: '1px solid #dbeafe'
                }}>
                  {t.product_category}
                </span>
              </td>
              <td style={tdStyle}>{t.quantity}</td>
              <td style={{ ...tdStyle, fontWeight: '600' }}>${t.total_amount}</td>
              <td style={tdStyle}>
                <span style={{ 
                    color: t.order_status === 'Completed' ? '#166534' : 
                           t.order_status === 'Pending' ? '#854d0e' : 
                           t.order_status === 'Cancelled' ? '#991b1b' : '#334155',
                    background: t.order_status === 'Completed' ? '#dcfce7' : 
                                t.order_status === 'Pending' ? '#fef9c3' : 
                                t.order_status === 'Cancelled' ? '#fee2e2' : '#f1f5f9',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                }}>
                    {t.order_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '1rem 1.5rem',
  textAlign: 'left',
  fontWeight: '600',
  color: '#64748b',
  cursor: 'pointer',
  userSelect: 'none',
  borderBottom: '1px solid var(--border)',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '1rem 1.5rem',
  color: '#334155',
  borderBottom: '1px solid #f1f5f9',
  verticalAlign: 'middle'
};

export default TransactionTable;
