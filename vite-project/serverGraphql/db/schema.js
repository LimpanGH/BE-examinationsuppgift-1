const { Product } = require("./models"); // Ensure this path is correct

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLScalarType,
} = require("graphql");

// Define the Contact Type
const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
});

// Define the Manufacturer Type
const ManufacturerType = new GraphQLObjectType({
  name: "Manufacturer",
  fields: {
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: ContactType },
  },
});

// Define the Product Type
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLInt },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    manufacturer: { type: ManufacturerType },
    amountInStock: { type: GraphQLInt },
  },
});

const CriticalProductsType = new GraphQLObjectType({
  name: "CriticalProducts",
  fields: {
    name: { type: GraphQLString },
    manufacturerName: { type: GraphQLString },
    contactName: { type: GraphQLString },
    contactPhone: { type: GraphQLString },
    contactEmail: { type: GraphQLString },
    amountInStock: { type: GraphQLInt },
  },
});

const TotalStockValueType = new GraphQLObjectType({
  name: "TotalStockValue",
  name: "TotalStockValue",
  fields: {
    totalValue: { type: GraphQLFloat },
  },
});

// Define the ManufacturerStockValue Type
const ManufacturerStockType = new GraphQLObjectType({
  name: "ManufacturerStockValue",
  name: "ManufacturerStockValue",
  fields: {
    manufacturer: { type: GraphQLString },
    totalStockValue: { type: GraphQLFloat },
  },
});

const UniqueManufacturerResultType = new GraphQLObjectType({
  name: "ManufacturerResult",
  fields: {
    manufacturers: { type: new GraphQLList(ManufacturerType) },
    totalManufacturersCount: { type: GraphQLInt },
  },
});

// Define the Manufacturer Input Type
const ManufacturerInputType = new GraphQLInputObjectType({
  name: "ManufacturerInput",
  name: "ManufacturereInput",
  fields: () => ({
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: ContactInputType },
  }),
});

// Define the Contact Input Type
const ContactInputType = new GraphQLInputObjectType({
  name: "ContactInput",
  name: "ContactInput",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Define the Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  name: "RootQueryType",
  fields: {
    // Fetch a product by ID
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    // Fetch all products
    products: {
      type: new GraphQLList(ProductType),
      args: {
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
        sortBy: { type: GraphQLString },
        orderBy: { type: GraphQLString },
        category: { type: GraphQLString },
        manufacturerName: { type: GraphQLString },
        amountInStock: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        try {
          const limit = args.limit || 10; // Default to 10 if limit is not provided
          const page = args.page || 1; // Default to 1 if page is not provided
          const offset = (page - 1) * limit; // Calculate offset
          const sortField = args.sortBy || "name"; // Default to 'name' if sortBy is not provided
          const sortOrder = args.orderBy === "desc" ? -1 : 1; // Sort order: -1 for desc, 1 for asc

          console.log(
            `Fetching products with limit: ${limit}, page: ${page}, offset: ${offset}, sortField: ${sortField}, sortOrder: ${sortOrder}`
          );
          //Build filter object
          const filter = {};
          if (args.category) filter.category = args.category;
          if (args.manufacturerName)
            filter["manufacturer.name"] = args.manufacturerName;
          if (args.amountInStock !== undefined)
            filter.amountInStock = { $lte: args.amountInStock };

          // Log the filter object for debugging
          console.log("Filter object:", filter);

          // Fetch products with pagination and sorting
          const products = await Product.find(filter)
            //.where("category")
            //.equals(args.category)
            .sort({ [sortField]: sortOrder })
            .skip(offset)
            .limit(limit);

          return products;
        } catch (error) {
          console.error("Error fetching products:", error);
          throw new Error("Failed to fetch products");
        }
      },
    },
    // Fetch total stock value
    totalStockValue: {
      type: TotalStockValueType,
      resolve() {
        return Product.aggregate([
          {
            $match: {
              amountInStock: { $exists: true, $ne: null },
            },
          },
          {
            $group: {
              _id: null,
              totalValue: {
                $sum: { $multiply: ["$amountInStock", "$price"] },
              },
            },
          },
          {
            $project: {
              _id: false,
              totalValue: 1,
            },
          },
        ]).then((result) => result[0] || { totalValue: 0 });
      },
    },
    // Fetch total stock value by manufacturer
    totalStockValueByManufacturer: {
      type: new GraphQLList(ManufacturerStockType),
      resolve() {
        return Product.aggregate([
          {
            $match: {
              amountInStock: { $exists: true, $ne: null },
            },
          },
          {
            $group: {
              _id: "$manufacturer.name",
              totalStockValue: {
                $sum: { $multiply: ["$amountInStock", "$price"] },
              },
            },
          },
          {
            $project: {
              _id: false,
              manufacturer: "$_id",
              totalStockValue: 1,
            },
          },
        ]);
      },
    },
    criticalStockProducts: {
      type: new GraphQLList(CriticalProductsType),
      resolve() {
        return Product.aggregate([
          {
            $match: {
              amountInStock: { $lt: 5 },
            },
          },
          {
            $project: {
              name: 1,
              manufacturerName: "$manufacturer.name",
              contactName: "$manufacturer.contact.name",
              contactPhone: "$manufacturer.contact.phone",
              contactEmail: "$manufacturer.contact.email",
              amountInStock: 1,
            },
          },
        ]);
      },
    },

    lowStockProducts: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({ amountInStock: { $lt: 10 } });
      },
    },
    // Fetch all manufacturers, filtering out duplicates
    uniqueManufacturers: {
      type: UniqueManufacturerResultType,
      async resolve() {
        const manufacturers = await Product.aggregate([
          {
            // Group by manufacturer name (or any other unique field)
            $group: {
              _id: "$manufacturer.name",
              uniqueManufacturer: { $first: "$manufacturer" },
            },
          },
          {
            // Project the fields we want to return
            $project: {
              _id: false,
              name: "$uniqueManufacturer.name",
              country: "$uniqueManufacturer.country",
              website: "$uniqueManufacturer.website",
              description: "$uniqueManufacturer.description",
              address: "$uniqueManufacturer.address",
              contact: "$uniqueManufacturer.contact",
            },
          },
        ]);

        // Calculate the total number of unique manufacturers
        const totalManufacturersCount = manufacturers.length;
        console.log(manufacturers.length);

        // Return the unique manufacturers and the count
        return { manufacturers, totalManufacturersCount };
      },
    },
  },
});

// Define the Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  name: "Mutation",
  fields: {
    // Add product ---------
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        sku: { type: GraphQLInt },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        manufacturerName: { type: GraphQLString },
        manufacturerCountry: { type: GraphQLString },
        manufacturerWebsite: { type: GraphQLString },
        manufacturerDescription: { type: GraphQLString },
        manufacturerAddress: { type: GraphQLString },
        contactName: { type: GraphQLString },
        contactEmail: { type: GraphQLString },
        contactPhone: { type: GraphQLString },
        amountInStock: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const newProduct = new Product({
          name: args.name,
          sku: args.sku,
          description: args.description,
          price: args.price,
          category: args.category,
          manufacturer: {
            name: args.manufacturerName,
            country: args.manufacturerCountry,
            website: args.manufacturerWebsite,
            description: args.manufacturerDescription,
            address: args.manufacturerAddress,
            contact: {
              name: args.contactName,
              email: args.contactEmail,
              phone: args.contactPhone,
            },
          },
          amountInStock: args.amountInStock,
        });

        return newProduct.save();
      },
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        sku: { type: GraphQLInt },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        manufacturer: { type: ManufacturerInputType },
        amountInStock: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const updatedProduct = await Product.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              sku: args.sku,
              description: args.description,
              price: args.price,
              category: args.category,
              manufacturer: args.manufacturer,
              amountInStock: args.amountInStock,
            },
          },
          { new: true }
        );
        return updatedProduct;
      },
    },
    // Delete product ---------
    deleteProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

/// End of schema.js
