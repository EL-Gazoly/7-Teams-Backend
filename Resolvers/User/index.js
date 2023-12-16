const prisma = require("../../config/database");
const jwt = require('jsonwebtoken');
const { readFile } = require('../../Middlewares/file')

const userQuery = {
  users: async () => {
    return await prisma.user.findMany();
  },
  user: async (_parent, args) => {
    const { id } = args;
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  },
};

const userMuation = {
  createUser: async (_parent, args) => {
    // data.data.hashedPassword = process.password.hashSync(data.data.hashedPassword);
    const { data, image } = args;

    const user = await prisma.user.create({
      data: data.data,
    });
    if(image) data.imageUrl = await readFile(image);
    return user;
  },
  updateUser: async (_parent, data) => {
    const { data, image } = args;
    // if (data.data.hashedPassword) {
    //   data.data.hashedPassword = Bun.password.hashSync(data.data.hashedPassword);
    // }
    if(image) data.imageUrl = await readFile(image);

    const user = await prisma.user.update({
      where: {
        id: data.id,
      },

      data: data.data,
    });
    return user;
  },
  deleteUser: async (_parent, data) => {
    const user = await prisma.user.delete({
      where: {
        id: data.id,
      },
    });
    return user;
  },
  loginUser: async (_parent, data) => {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    // const isMatch = Bun.password.verifySync(data.hashedPassword, user.hashedPassword);
    // if (!isMatch) {
    //   throw new Error('Invalid password');
    // }
    const getRolePermission = await prisma.roles.findUnique({
      where: {
        id: user.roleId,
      },
    });
    const token = jwt.sign({
      roleId: user.roleId,
      adminId: user.adminId,
      userid: user.id,
      isDevicesAccess: getRolePermission?.isDevicesAccess,
      isStudentsAccess: getRolePermission?.isStudentsAccess,
      isReportsAccess: getRolePermission?.isReportsAccess,
      isLogsAccess: getRolePermission?.isLogsAccess,
      isRolesAccess: getRolePermission?.isRolesAccess,
      isUsersAccess: getRolePermission?.isUsersAccess,
    }, `${process.env.JWT_SECRET_KET}`);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: token,
      },
    });
    return user;
  },
};

const userRelation = {
  User: {
    students: async (parent) => {
      return await prisma.student.findMany({
        where: {
          adminId: parent.adminId,
        },
      });
    },
    devices: async (parent) => {
      return await prisma.device.findMany({
        where: {
          adminId: parent.adminId,
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
    roles: async (parent) => {
      return await prisma.roles.findUnique({
        where: {
          id: parent.roleId,
        },
      });
    },
  },
};

module.exports = {
  userQuery,
  userMuation,
  userRelation,
};
