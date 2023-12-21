const prisma = require("../../config/database");
const jwt = require('jsonwebtoken');
const  { generatePassword, validatePassword } = require ("../../Middlewares/password");

const adminQuery = {
  admins: async () => {
    return await prisma.admin.findMany();
  },
  admin: async (_parent, _args, ctx) => {
    return await prisma.admin.findUnique({
      where: {
        id: ctx.user.adminId,
      },
    });
  },
};

const adminMuation = {
  createAdmin: async (_parent, { data }) => {
    data.hashedPassword = generatePassword(data.hashedPassword)
    const admin = await prisma.admin.create({
      data: data,
    });
    jwt.sign({ admin }, `${process.env.JWT_SECRET_KET}`);
    return admin;
  },
  updateAdmin: async (_parent, { id, data }) => {
    const admin = await prisma.admin.update({
      where: {
        id: id,
      },
      data: data,
    });
    return admin;
  },
  deleteAdmin: async (_parent, { id }) => {
    const admin = await prisma.admin.delete({
      where: {
        id: id,
      },
    });
    return admin;
  },
  loginAdmin: async (_parent, { email, password, deviceMacAddress, deviceName }) => {
  
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!admin) {
      throw new Error('No such user found');
    }
    const isPasswordValid = validatePassword(password, admin.hashedPassword);
    if (!isPasswordValid) return new Error('Invalid password');
    if (deviceMacAddress){
      const device = await prisma.device.findUnique({
        where: {
          macAddress: deviceMacAddress,
        },
      });
      if (!device) {
        await prisma.device.create({
          data: {
            name: deviceName,
            macAddress: deviceMacAddress,
            adminId: admin.id,
          },
        });
      } 
    }
    // const isPasswordValid = Bun.password.verifySync(password, admin.hashedPassword);
    // if (!isPasswordValid) {
    //   throw new Error('Invalid password');
    // }
    const token = jwt.sign({
      adminId: admin.id,
      isAdmin: true,
    }, `${process.env.JWT_SECRET_KET}`);

    await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        token: token
      },
    });

    return admin;
  }
};

const adminRelation = {
  Admin: {
    users: async (parent) => {
      return await prisma.user.findMany({
        where: {
          adminId: parent.id,
        },
      });
    },
    devices: async (parent) => {
      return await prisma.device.findMany({
        where: {
          adminId: parent.id,
        },
      });
    },

    students: async (parent) => {
      return await prisma.student.findMany({
        where: {
          adminId: parent.id,
        },
      });
    },
    roles: async (parent) => {
      return await prisma.roles.findMany({
        where: {
          adminId: parent.id,
        },
      });
    },
  }
};

module.exports = {
  adminQuery,
  adminMuation,
  adminRelation,
};
