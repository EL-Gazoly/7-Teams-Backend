const Query = require("./Queries/Query");
const Mutation = require("./Mutaions");
const Relations = require("./Relations");
const {GraphQLUpload} = require("graphql-upload");
const resolvers = {
  Upload: GraphQLUpload,
  Query,
  Mutation,
  ...Relations,
};

module.exports = resolvers;
