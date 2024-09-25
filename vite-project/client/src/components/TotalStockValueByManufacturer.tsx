import { useState } from 'react';

function TotalStockValueByManufacturer() {
  const [manufacturer, setManufacturer] = useState(''); // State to hold the manufacturer input
  const [stockValue, setStockValue] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [submittedManufacturer, setSubmittedManufacturer] =
    useState<string>('');

  const fetchStockValue = async () => {
    if (!manufacturer) {
      setError('Manufacturer is required');
      return;
    } // Do not fetch if manufacturer is not set

    try {
      const response = await fetch(
        `http://localhost:3000/products/total-stock-value-by-manufacturer?manufacturer=${manufacturer}`
      );
      if (!response.ok) {
        throw new Error('Network response not ok');
      }
      const data = await response.json();
      if (data.stockValue !== undefined) {
        setStockValue(data.stockValue);
        setSubmittedManufacturer(manufacturer);
        setError(null);
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setManufacturer('');
    }
  };

  // Call fetchStockValue when the manufacturer changes and the user has input something
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManufacturer(e.target.value);
    if (e.target.value) {
      setStockValue(null);
      setError(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchStockValue();
    }
  };

  return (
    <div>
      <p>Total Stock Value by Manufacturer</p>
      <input
        type='text'
        value={manufacturer}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} // Detect Enter key press
        placeholder='Enter manufacturer'
      />
      <button onClick={fetchStockValue}>Stock value</button>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        stockValue !== null &&
        submittedManufacturer && (
          <p>
            Total Stock Value for <strong>{submittedManufacturer}</strong>:
            {stockValue}
          </p>
        )
      )}
    </div>
  );
}

export default TotalStockValueByManufacturer;
