const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
const path = require('path'); 

// Define your GraphQL schema with mutation types for create, update, and delete
const typeDefs = `
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Product {
    id: Int!
    name: String!
    description: String
    price: Float!
  }

  type Order {
    id: Int!
    userId: Int!
    productId: Int!
    quantity: Int!
  }

  type Query {
    users: [User!]!
    products: [Product!]!
    orders: [Order!]!
  }

  type Mutation {
    createUser(username: String!, email: String!): User!
    updateUser(id: Int!, username: String, email: String): User!
    deleteUser(id: Int!): User!
    createProduct(name: String!, description: String, price: Float!): Product!
    updateProduct(id: Int!, name: String, description: String, price: Float): Product!
    deleteProduct(id: Int!): Product!
    createOrder(userId: Int!, productId: Int!, quantity: Int!): Order!
    updateOrder(id: Int!, userId: Int, productId: Int, quantity: Int): Order!
    deleteOrder(id: Int!): Order!
  }
`;

// Define resolvers for mutation operations
const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    products: async () => await prisma.product.findMany(),
    orders: async () => await prisma.order.findMany(),
  },
  Mutation: {
    createUser: async (_, { username, email }) => {
      return await prisma.user.create({ data: { username, email } });
    },
    updateUser: async (_, { id, username, email }) => {
      return await prisma.user.update({ where: { id }, data: { username, email } });
    },
    deleteUser: async (_, { id }) => {
      return await prisma.user.delete({ where: { id } });
    },
    createProduct: async (_, { name, description, price }) => {
      return await prisma.product.create({ data: { name, description, price } });
    },
    updateProduct: async (_, { id, name, description, price }) => {
      return await prisma.product.update({ where: { id }, data: { name, description, price } });
    },
    deleteProduct: async (_, { id }) => {
      return await prisma.product.delete({ where: { id } });
    },
    createOrder: async (_, { userId, productId, quantity }) => {
      return await prisma.order.create({ data: { userId, productId, quantity } });
    },
    updateOrder: async (_, { id, userId, productId, quantity }) => {
      return await prisma.order.update({ where: { id }, data: { userId, productId, quantity } });
    },
    deleteOrder: async (_, { id }) => {
      return await prisma.order.delete({ where: { id } });
    },
  },
};

// Create an executable GraphQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Configure CORS to allow requests from localhost
app.use(cors({ origin: 'http://localhost' }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use GraphQL middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL interface for testing
}));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
//jjj