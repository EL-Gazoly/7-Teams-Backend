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
type UpdateUserInput =  {
    name: string
    email: string
    hashedPassword: string
    role: string
    isLocked: boolean
    LockedUntil: Date
    passwordRetryCount: number
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
    createUser: async (_ : undefined, data: { data: CreateUserInput }) => {
    data.data.hashedPassword = Bun.password.hashSync(data.data.hashedPassword);
      const user = await prisma.user.create({
        data: data.data,
      });
      return user;
    },
    updateUser: async (_ : undefined, data: { id: string, data: UpdateUserInput }) => {
        if (data.data.hashedPassword) {
            data.data.hashedPassword = Bun.password.hashSync(data.data.hashedPassword);
        }
        const user = await prisma.user.update({
        where: {
          id: data.id,
        },
        data: data.data,
      });
      return user;
    },
    deleteUser: async (_ : undefined, data: { id: string }) => {
      const user = await prisma.user.delete({
        where: {
          id: data.id,
        },
      });
      return user;
    },
}

const userRelation = {
  User: {
    student : async (parent : any) => {
        return await prisma.student.findMany({
            where: {
                userId: parent.id,
            },
        
        })
    },
    devices : async (parent : any) => {
        return await prisma.device.findMany({
            where: {
                userId: parent.id,
            },
        
        })
    },

  },
}

export {
    userQuery,
    userMuation,
    userRelation
};