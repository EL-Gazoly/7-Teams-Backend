import prisma from "../../config/database";

type CreateRoleInput = {
    name: string
    adminId: string
    isDevicesAccess: boolean 
    isStudentsAccess: boolean 
    isReportsAccess: boolean 
    isLogsAccess: boolean 
    isRolesAccess: boolean 
    isUsersAccess: boolean 
  }
  
type UpdateRoleInput = {
    name: string
    isDevicesAccess: boolean 
    isStudentsAccess: boolean 
    isReportsAccess: boolean 
    isLogsAccess: boolean 
    isRolesAccess: boolean 
    isUsersAccess: boolean
}

const roleQuery = {
    roles : async () => {
        return await prisma.roles.findMany();
    },
    role : async ( _ : null, args: {id : string} ) => {
        return await prisma.roles.findUnique({
            where: {
                id: args.id,
            },
        })
    },
}

const roleMuation = {
    createRole: async (_ : undefined, data: { data: CreateRoleInput }) => {
      const role = await prisma.roles.create({
        data: data.data,
      });
      return role;
    },
    updateRole: async (_ : undefined, data: { id: string, data: UpdateRoleInput }) => {
        const role = await prisma.roles.update({
        where: {
          id: data.id,
        },
        data: data.data,
      });
      return role;
    },
    deleteRole: async (_ : undefined, data: { id: string }) => {
      const role = await prisma.roles.delete({
        where: {
          id: data.id,
        },
      });
      return role;
    },
}

const roleRelation = {
    Role: {
        users: async (parent: { roleId: string }) => {
            return await prisma.roles.findUnique({
                where: {
                    id: parent.roleId,
                },
            }).users();
        },
        admin: async (parent: { adminId: string }) => {
            return await prisma.roles.findFirst({
                where: {
                    adminId: parent.adminId,
                },
            }).admin();
        },
    }
}
export{
    roleQuery,
    roleMuation,
    roleRelation
}