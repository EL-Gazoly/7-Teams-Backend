import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from '../Graphql/typeDefs';
import resolvers from '../Graphql/resolvers';
const server = new ApolloServer({typeDefs,resolvers,});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);

