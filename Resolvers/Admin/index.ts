import prisma from "../../config/database";
import  jwt from 'jsonwebtoken';
type CreateAdminInput = {
    name: string
    email: string
    hashedPassword: string
    isLocked: boolean
    LockedUntil: Date
    passwordRetryCount: number
  }
  
type UpdateAdminInput = {
    name: string
    email: string
    hashedPassword: string
    isLocked: boolean
    LockedUntil: Date
    passwordRetryCount: number
  }

const adminQuery = {
    admins : async () => {
        return await prisma.admin.findMany();
    },
    admin : async ( _ : null, args: {id : string} ) => {
        return await prisma.admin.findUnique({
            where: {
                id: args.id,
            },
        })
    },
}

const adminMuation = {
    createAdmin: async (_ : undefined, data: { data: CreateAdminInput }) => {
    data.data.hashedPassword = Bun.password.hashSync(data.data.hashedPassword);
      const admin = await prisma.admin.create({
        data: data.data,
      });
      const token = jwt.sign({ admin }, `${Bun.env.JWT_SECRET_KET}`);
      console.log(token);
      return admin;
    },
    updateAdmin: async (_ : undefined, data: { id: string, data: UpdateAdminInput }) => {
        if (data.data.hashedPassword) {
            data.data.hashedPassword = Bun.password.hashSync(data.data.hashedPassword);
        }
        const admin = await prisma.admin.update({
        where: {
          id: data.id,
        },
        data: data.data,
      });
      return admin;
    },
    deleteAdmin: async (_ : undefined, data: { id: string }) => {
      const admin = await prisma.admin.delete({
        where: {
          id: data.id,
        },
      });
      return admin;
    },
}

const adminRelation = {
   Admin :{
    users : async (parent: { id: string }) => {
        return await prisma.user.findMany({
            where: {
            adminId: parent.id,
            },
        });
    },
    devices : async (parent: { id: string }) => {
        return await prisma.device.findMany({
            where: {
            adminId: parent.id,
            },
        });
    },

    students : async (parent: { id: string }) => {
        return await prisma.student.findMany({
            where: {
            adminId: parent.id,
            },
        });
    },
    roles : async (parent: { id: string }) => {
        return await prisma.roles.findMany({
            where: {
            adminId: parent.id,
            },
        });
    },
   }
}

export  {
    adminQuery,
    adminMuation,
    adminRelation,
}