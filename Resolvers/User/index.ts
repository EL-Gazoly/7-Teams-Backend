import prisma from "../../config/database";
const userQuery = {
    users : async () => {
        return await prisma.user.findMany();
    },
    user : async ( _ : null, args: {id : string} ) => {
        return await prisma.user.findUnique({
            where: {
                id: args.id,
            },
        })
    },
}

const userMuation = {
    createUser: async (_ : any,data: { data: any }) => {
      if (!data.data.name) {
        throw new Error('Name is required');
      }

      const user = await prisma.user.create({
        data: data.data,
      });
      return user;
    },
}

export {
    userQuery,
    userMuation
};