import { useState, useEffect } from 'react';
import api from '../services/api';

export const useSales = (filters = {}, page = 1) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('page', page);
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        const response = await api.get(`sales/?${params.toString()}`);
        setData(response.data.results);
        setCount(response.data.count);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [JSON.stringify(filters), page]);

  return { data, count, loading, error };
};
