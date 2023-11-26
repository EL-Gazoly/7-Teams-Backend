import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({
  typeDefs: `#graphql
  type Book {
      title: String
      author: String
  }

  type Query {
      books: [Book]
  }
`,
  resolvers : {
    Query: {
      books: () => {
          return [
              {
                  title: 'Elysia',
                  author: 'saltyAom'
              }
          ]
      }
  }
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);

