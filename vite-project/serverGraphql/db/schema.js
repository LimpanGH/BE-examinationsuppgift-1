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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation,
});
