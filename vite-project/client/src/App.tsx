// import React, { useEffect, useState } from 'react';

// import './App.css';

// type Product = {
//   name: string;
//   sku: number;
//   description: string;
//   price: number;
//   category: string;
//   amountInStock: number;
//   manufacturer: {
//     name: string;
//     country: string;
//     website: string;
//     description: string;
//     address: string;
//     contact: {
//       name: string;
//       email: string;
//       phone: string;
//     };
//   };
// };

// const App: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchId, setSearchId] = useState<string>('');
//   const [searchedProduct, setSearchedProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/products');
//       if (!response.ok) {
//         throw new Error('Network response not ok');
//       }
//       const data: Product[] = await response.json();
//       console.log(data);
//       setProducts(data);
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductById = async (id: string) => {
//     try {
//       const response = await fetch(`http://localhost:3000/products/${id}`);
//       if (!response.ok) {
//         throw new Error('Network response not ok');
//       }
//       const data: Product = await response.json();
//       setSearchedProduct(data);
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchId) {
//       fetchProductById(searchId);
//     }
//   };


//   return (
//     <>
//       <div className='App'>
//         <h1>Product List</h1>

//   {/* Search Form */}
//   <div>
//           <form onSubmit={handleSearch}>
//             <label htmlFor="productId">Search by ID:</label>
//             <input
//               id="productId"
//               type="text"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               placeholder="Enter product ID"
//             />
//             <button type="submit">Search</button>
//           </form>
//         </div>

//           {/* Display searched product */}
//           {searchedProduct && (
//           <div>
//             <h2>Search Results</h2>
//             <h3>{searchedProduct.name}</h3>
//             <p>{searchedProduct.description}</p>
//             <p>Price: {searchedProduct.price}</p>
//             <p>Category: {searchedProduct.category}</p>
//             <p>In Stock: {searchedProduct.amountInStock}</p>
//             <p>Manufacturer: {searchedProduct.manufacturer.name}</p>
//           </div>
//         )}

//         {loading && <p>Error: {error}</p>}
//         <ul>
//           {products.map((product) => (
//             <li key={product.sku}>
//               <h2>{product.name}</h2>
//               <p>{product.description}</p>
//               <p>Price: {product.price}</p>
//               <p>Category: {product.category}</p>
//               <p>In Stock: {product.amountInStock}</p>
//               <p>Manufacturer: {product.manufacturer.name}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default App;
