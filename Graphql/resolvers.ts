import Query from "./Queries/Query";
import Mutation from "./Mutaions"
import Relations from "./Relations";
const resolvers = {
    Query,
    Mutation,
   ...Relations,
};

export default resolvers;
