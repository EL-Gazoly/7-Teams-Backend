const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const  { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const permession = require('./permissions');
const resolvers = require('./Graphql/resolvers');
const typeDefs = require('./Graphql/typeDefs');
const {graphqlUploadExpress} = require("graphql-upload")
const path = require('path');
const app = express();

const schema = applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
  )

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

server.start().then(() => {
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  app.get('/', (_, res) => {
    res.redirect('/graphql');
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});