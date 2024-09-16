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
                products {
                  manufacturer {
                    name
                    country
                    website
                    description
                    address
                    contact {
                      name
                      email
                      phone
                    }
                  }
                }
              }
            `,
          }),
        });
        const result = await response.json();
        setData(result.data.products);
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
      <h2>Manufacturers</h2>
      {loading && <p>Loading, if error {error}</p>}
      <ul>
        {data.map((product, index) => (
          <li key={index}>
            <h2>{product.manufacturer.name}</h2>
            <p>Country: {product.manufacturer.country}</p>
            <p>Website: {product.manufacturer.website}</p>
            <p>Description: {product.manufacturer.description}</p>
            <p>Address: {product.manufacturer.address}</p>
            <p>Contact Name: {product.manufacturer.contact.name}</p>
            <p>Contact Email: {product.manufacturer.contact.email}</p>
            <p>Contact Phone: {product.manufacturer.contact.phone}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default ManufacturerRoute;
