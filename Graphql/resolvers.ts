import Query from "./Queries/Query";
import Mutation from "./Mutaions"
import Relations from "./Relations";
import { GraphQLUpload } from 'graphql-upload-ts';
const resolvers = {
    Upload: GraphQLUpload,
    Query,
    Mutation,
   ...Relations,
};

export default resolvers;
