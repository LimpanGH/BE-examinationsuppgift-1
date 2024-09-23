export type Product = {
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
    address: string;
    contact: {
      name: string;
      email: string;
      phone: string;
    };
  };
};

export type Manufacturer = {
  name: string;
  country: string;
  website: string;
  description: string;
  address: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
};

export type RestStockValuesForAllManufacturers = {
  manufacturerName: string;
  totalStockValue: number;
};

export type GraphQLStockValuesForAllManufacturers = {
  manufacturer: string;
  totalStockValue: number;
};