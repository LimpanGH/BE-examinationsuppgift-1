import { useEffect, useState } from 'react';
import { RestStockValuesForAllManufacturers } from '../types/types';

const StockValuesForAllManufacturersRoute = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/products/total-stock-value-for-all-manufacturers'
        );
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        const data = await response.json();
        setManufacturers(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchManufacturers();
  }, []);

  return (
    <main>
      <h2>Stock values for all manufacturers REST</h2>
      {loading && <p>Error: {error}</p>}
      <ul>
        {manufacturers.map(
          (manufacturer: RestStockValuesForAllManufacturers, index) => (
            <li
              key={index}
              style={{ border: '2px solid green', listStyleType: 'none' }}
            >
              <p>{manufacturer.manufacturerName}</p>
              <p>Stock value: {manufacturer.totalStockValue}</p>
            </li>
          )
        )}
      </ul>
    </main>
  );
};
export default StockValuesForAllManufacturersRoute;
