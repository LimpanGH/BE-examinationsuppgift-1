import { useEffect, useState } from 'react';

function TotalStockValueByManufacturer() {
  const [manufacturer, setManufacturer] = useState(''); // State to hold the manufacturer input
  const [stockValue, setStockValue] = useState(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      if (!manufacturer) return; // Do not fetch if manufacturer is not set
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/total-stock-value-by-manufacturer?manufacturer=${encodeURIComponent(
            manufacturer
          )}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        // Log the response status and headers
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Log the raw response text
        const responseText = await response.text();
        console.log('Response Text:', responseText);
        // Parse the response text as JSON
        const result = JSON.parse(responseText);
        setStockValue(result.stockValue);
      } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching data:', error.message);
          setError(error.message);
        }

      }
    }
    fetchData();
  }, [manufacturer]); // Fetch data when manufacturer changes
  return (
    <div>
      <p>Total Stock Value by Manufacturer</p>
      <input
        type='text'
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
        placeholder='Enter manufacturer'
      />
      {error ? (
        <p>Error: {error}</p>
      ) : (
        stockValue !== null && <p>Total Stock Value: ${stockValue}</p>
      )}
    </div>
  );
}
export default TotalStockValueByManufacturer;