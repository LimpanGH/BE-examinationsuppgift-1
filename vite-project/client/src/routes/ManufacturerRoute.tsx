import style from '../CSS/ManufacturerRoute.module.css';
import { useEffect, useState } from 'react';
// import { Manufacturer } from '../types/types';

const ManufacturerRoute = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/products/manufacturers'
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
      <h2>Manufacturers REST</h2>
      {loading && <p>Error: {error}</p>}
      <ul style={{ listStyleType: 'none' }}>
        {manufacturers.map((manufacturer, index) => (
          <li key={manufacturer} className={style['product-list']}>
            <p>{index +1}. {manufacturer}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default ManufacturerRoute;


