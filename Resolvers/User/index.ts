import prisma from "../../config/database";
type CreateUserInput =  {
  name: string
  email: string
  hashedPassword: string
  role: string
  isLocked?: boolean | undefined
  LockedUntil?: Date
  passwordRetryCount?: number | undefined
}

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
    createUser: async (_ : any,data: { data: CreateUserInput }) => {
    data.data.hashedPassword = Bun.password.hashSync(data.data.hashedPassword);
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