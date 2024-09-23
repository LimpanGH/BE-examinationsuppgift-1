import { useEffect, useState } from 'react';
import { Product } from '../types/types';
import style from './HomeRoute.module.css';
import TotalStockValueByManufacturer from '../components/TotalStockValueByManufacturer';

const HomeRoute: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string>('');
  const [searchedProduct, setSearchedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost:3000/products?limit=50');
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        const data: Product[] = await response.json();
        //console.log(data);
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
    fetchProduct();
  }, []);

  const fetchProductById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      if (!response.ok) {
        throw new Error('Network response not ok');
      }
      const data: Product = await response.json();
      setSearchedProduct(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) {
      fetchProductById(searchId);
    }
  };

  return (
    <main>
      <TotalStockValueByManufacturer />
      {/* Search Form */}
      <h1>Product List</h1>
      <div>
        <form onSubmit={handleSearch}>
          <label htmlFor='productId'>Search by ID:</label>
          <input
            id='productId'
            type='text'
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder='Enter product ID'
          />
          <button type='submit'>Search</button>
        </form>
      </div>

      {/* Display searched product */}
      {searchedProduct && (
        <div>
          <h2>Search Results</h2>
          <h3>{searchedProduct.name}</h3>
          <p>{searchedProduct.description}</p>
          <p>Price: {searchedProduct.price}</p>
          <p>Category: {searchedProduct.category}</p>
          <p>In Stock: {searchedProduct.amountInStock}</p>
          <p>Manufacturer: {searchedProduct.manufacturer.name}</p>
        </div>
      )}

      {loading && <p>Error: {error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.sku} className={style['product-list']}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>In Stock: {product.amountInStock}</p>
            <p>Manufacturer: {product.manufacturer.name}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomeRoute;
