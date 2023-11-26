import Query from "./Queries/Query";
import Mutation from "./Mutaions"
import prisma from "../config/database";
const resolvers = {
    Query,
    Mutation
};

export default resolvers;
