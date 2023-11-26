import prisma from "../config/database";


const resolvers = {
 Query: {
    users : async () => {
        return await prisma.user.findMany();
    },
    user : async ( args: {id : string} ) => {
        return await prisma.user.findUnique({
            where: {
                id: args.id,
            },
        })
    }
 }
}

export default resolvers;
