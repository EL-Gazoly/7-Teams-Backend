import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from '../Graphql/typeDefs';
import resolvers from '../Graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { rule, shield } from 'graphql-shield';
import  jwt from 'jsonwebtoken';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    const token = ctx.req.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      const decoded = await jwt.verify(token, `${Bun.env.JWT_SECRET_KET}`);
      ctx.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  },
);
const allowAll = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  return true; // Allow access for all operations not explicitly mentioned
});

const permession = shield({
  Query: {
    users: isAuthenticated,
    user: isAuthenticated,
    
  },
  Mutation: {
    updateUser: isAuthenticated,
    deleteUser: isAuthenticated,
  },
})

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permession,
)

const server = new ApolloServer({
  schema,
});


const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    req
  }),
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);

