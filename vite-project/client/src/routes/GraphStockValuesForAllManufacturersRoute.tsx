import { useEffect, useState } from 'react';
import { GraphQLStockValuesForAllManufacturers } from '../types/types';

const GraphStockValuesForAllManufacturersRoute = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              {
                totalStockValueByManufacturer {
                  manufacturer 
                  totalStockValue
                }
              }
            `,
          }),
        });
        const result = await response.json();
        setManufacturers(result.data.totalStockValueByManufacturer);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <h2>Stock values for all manufacturers GraphQL</h2>
      {loading && <p>Error: {error}</p>}
      <ul>
        {manufacturers.map(
          (manufacturer: GraphQLStockValuesForAllManufacturers, index) => (
            <li
              key={index}
              style={{ border: '2px solid purple', listStyleType: 'none' }}
            >
              <p>{manufacturer.manufacturer}</p>
              <p>Stock value: {manufacturer.totalStockValue}</p>
            </li>
          )
        )}
      </ul>
    </main>
  );
};
export default GraphStockValuesForAllManufacturersRoute;
