import { useEffect, useState } from 'react';
// import { Manufacturer } from '../types/types';
import { Product } from '../types/types';

const ManufacturerRoute = () => {
  const [data, setData] = useState<Product[]>([]);
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
            uniqueManufacturers {
            totalManufacturersCount
            manufacturers {
            name   
            }
            }}
            `,
          }),
        });
        const result = await response.json();
        setData(result.data.uniqueManufacturers.manufacturers);
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
      <h2>Manufacturers GraphQL</h2>
      {loading && <p>Loading, if error {error}</p>}
      <ul style={{ listStyleType: 'none' }}>
        {data.map((manufacturers, index) => (
          <li key={index}>
            <p>{manufacturers.name}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default ManufacturerRoute;
