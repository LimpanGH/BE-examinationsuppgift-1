import { useEffect, useState } from 'react';
import { Product } from '../types/types';
import style from '../css/HomeRoute.module.css';
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
          <div className={style.container}>
            <div
              className={`${style.card} ${style.alignCenter} ${style.lightGray}`}
            >
              <h3>{searchedProduct.name}</h3>
              <p>{searchedProduct.category}</p>
              <p>{searchedProduct.description}</p>
              <div className={style.flex}>
                <p>Price: {searchedProduct.price}</p>
                <p>In Stock: {searchedProduct.amountInStock}</p>
              </div>
              <p>By: {searchedProduct.manufacturer.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* The product list */}
      {loading && <p>Error: {error}</p>}
      <ul className={`${style.ul} ${style.container}`}>
        {products.map((product) => (
          <li key={product.sku} className={style.card}>
            <h2>{product.name}</h2>
            <p className={style.right}>{product.category}</p>
            <p>{product.description}</p>
            <div className={style.flex}>
              <p>Price: {product.price}</p>
              <p>In Stock: {product.amountInStock}</p>
            </div>
            <p>By: {product.manufacturer.name}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomeRoute;
