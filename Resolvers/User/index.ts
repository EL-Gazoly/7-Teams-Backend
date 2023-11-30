import prisma from "../../config/database";
import  jwt from 'jsonwebtoken';
type CreateUserInput =  {
  name: string
  email: string
  hashedPassword: string
  isLocked?: boolean | undefined
  LockedUntil?: Date
  passwordRetryCount?: number | undefined
  adminId: string
  roleId: string
}
type UpdateUserInput =  {
    name: string
    email: string
    hashedPassword: string
    roleId: string
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

    loginUser : async (_ : undefined, data: { email: string, hashedPassword: string }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = Bun.password.verifySync(data.hashedPassword, user.hashedPassword);
      if (!isMatch) {
        throw new Error('Invalid password');
      }
      const getRolePermission = await prisma.roles.findUnique({
        where: {
          id: user.roleId,
        },
      })
      const token = jwt.sign({ 
          roleId: user.roleId,
          adminId: user.adminId,
          userid: user.id,
          isDevicesAccess: getRolePermission?.isDevicesAccess,
          isStudentsAccess: getRolePermission?.isStudentsAccess,
          isReportsAccess: getRolePermission?.isReportsAccess,
          isLogsAccess: getRolePermission?.isLogsAccess,
          isRolesAccess: getRolePermission?.isRolesAccess,
          isUsersAccess: getRolePermission?.isUsersAccess
       }, `${Bun.env.JWT_SECRET_KET}`);
      console.log(token);
      return user;
    
    }
}

const userRelation = {
  User: {
    students : async (parent : {adminId : string}) => {
        return await prisma.student.findMany({
            where: {
              adminId: parent.adminId,
            },
        
        })
    },
    devices : async (parent : {adminId : string}) => {
        return await prisma.device.findMany({
            where: {
              adminId: parent.adminId,
            },
        
        })
    },

    admin : async (parent : {adminId : string}) => {
        return await prisma.admin.findUnique({
            where: {
              id: parent.adminId,
            },
        
        })
    }

  },
}

export {
    userQuery,
    userMuation,
    userRelation
};