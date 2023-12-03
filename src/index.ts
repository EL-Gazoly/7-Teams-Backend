import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from '../Graphql/typeDefs';
import resolvers from '../Graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import permession from '../permissions';


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

