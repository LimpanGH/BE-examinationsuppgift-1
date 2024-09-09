// const Product = require('./models'); // Import the model, do not redeclare it.
const { Product } = require('./models'); // Ensure this path is correct

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
} = require('graphql');

const ContactType = new GraphQLObjectType({
  name: 'Contact',
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
});

const ManufacturerType = new GraphQLObjectType({
  name: 'Manufacturer',
  fields: {
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: ContactType },
  },
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
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
  name: 'CriticalProducts',
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
  name: 'TotalStockValue',
  fields: {
    totalValue: { type: GraphQLFloat },
  },
});

const ManufacturerStockType = new GraphQLObjectType({
  name: 'ManufacturerStockValue',
  fields: {
    manufacturer: { type: GraphQLString },
    totalStockValue: { type: GraphQLFloat },
  },
});

const ManufacturerInputType = new GraphQLInputObjectType({
  name: 'ManufacturereInput',
  fields: () => ({
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: ContactInputType },
  }),
});

const ContactInputType = new GraphQLInputObjectType({
  name: 'ContactInput',
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Define the root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find();
      },
    },
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
                $sum: { $multiply: ['$amountInStock', '$price'] },
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
    totalStockValueByManufacturer: {
      type: new GraphQLList(ManufacturerStockType),
      resolve() {
        return Product.aggregate([
          // { $match: { "manufacturer.name": "Feest LLC" } },
          {
            $match: {
              amountInStock: { $exists: true, $ne: null },
            },
          },
          {
            $group: {
              _id: '$manufacturer.name',
              totalStockValue: {
                $sum: { $multiply: ['$amountInStock', '$price'] },
              },
            },
          },
          {
            $project: {
              _id: false,
              manufacturer: '$_id',
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
              manufacturerName: '$manufacturer.name',
              contactName: '$manufacturer.contact.name',
              contactPhone: '$manufacturer.contact.phone',
              contactEmail: '$manufacturer.contact.email',
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
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
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
    // Update product ---------
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
