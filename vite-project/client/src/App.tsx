import React, { useEffect, useState } from 'react';

import './App.css';

type Product = {
  name: string;
  sku: number;
  description: string;
  price: number;
  category: string;
  amountInStock: number;
  manufacturer: {
    name: string;
    country: string;
    website: string;
    description: string;
    adress: string;
    contact: {
      name: string;
      email: string;
      phone: string;
    };
  };
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) {
        throw new Error('Network response not ok');
      }
      const data: Product[] = await response.json();
      console.log(data);
      setProducts(data);
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

  return (
    <>
      <div className='App'>
        <h1>Product List</h1>
        {loading && <p>Error: {error}</p>}
        <ul>
          {products.map((product) => (
            <li key={product.sku}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p>In Stock: {product.amountInStock}</p>
              <p>Manufacturer: {product.manufacturer.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
