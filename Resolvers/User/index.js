const prisma = require("../../config/database");
const jwt = require('jsonwebtoken');
const { readFile } = require('../../Middlewares/file')
const  { generatePassword, validatePassword } = require ("../../Middlewares/password");

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
  createUser: async (_parent, args, ctx) => {
    // data.data.hashedPassword = process.password.hashSync(data.data.hashedPassword);
    const { data, image } = args;
    if( image ) data.imageUrl = await readFile(image);

    data.hashedPassword= generatePassword(data.hashedPassword);
  
    data.adminId = ctx.user.adminId;


    const user = await prisma.user.create({
      data: data,
    });
    if(image) data.imageUrl = await readFile(image);
    return user;
  },
  updateUser: async (_parent, args) => {
    const { id, data, image } = args;

    if(image) data.imageUrl = await readFile(image);
    else if (!image) data.imageUrl = null;

    if (data.hashedPassword) {
      data.hashedPassword = generatePassword(data.hashedPassword);
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },

      data: data,
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
    const isPasswordValid = validatePassword(data.hashedPassword, user.hashedPassword);
    if (!isPasswordValid) return new Error('Invalid password');
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
