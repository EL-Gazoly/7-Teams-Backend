const prisma = require("../../config/database");

const roleQuery = {
  roles: async () => {
    return await prisma.roles.findMany();
  },
  role: async (_parent, args) => {
    return await prisma.roles.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};

const roleMuation = {
  createRole: async (_, { data }, ctx) => {
    try {
      const {  ...roles } = data;

      const createdRole = await prisma.roles.create({
        data: {
          ...roles,
          admin: { connect: { id: ctx.user.adminId } },
        },
      });

      return createdRole;
    } catch (error) {
      throw new Error(`Could not create role: ${error}`);
    }
  },
  updateRole: async (_parent, { id, data }) => {
    const role = await prisma.roles.update({
      where: {
        id: id,
      },
      data: data,
    });
    return role;
  },
  deleteRole: async (_parent, { id }) => {
    const role = await prisma.roles.delete({
      where: {
        id: id,
      },
    });
    return role;
  },
};

const roleRelation = {
  Role: {
    users: async (parent) => {
      return await prisma.user.findMany({
        where: {
          roleId: parent.id,
        },
      });
    },
    admin: async (parent) => {
      return await prisma.admin.findUnique({
        where: {
          id: parent.adminId,
        },
      });
    },
  },
};

module.exports = {
  roleQuery,
  roleMuation,
  roleRelation,
};
