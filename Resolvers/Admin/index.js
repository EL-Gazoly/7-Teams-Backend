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
    data.email = data.email.toLowerCase();
    const admin = await prisma.admin.create({
      data: data,
    });
    jwt.sign({ admin }, `${process.env.JWT_SECRET_KET}`);
    console.log(admin);
    await prisma.roles.createMany({
      data : [
       {
        name: "ادمن",
        adminId: admin.id,
        isDevicesAccess: true,
        isStudentsAccess: true,
        isSchoolAccess: true,
        isReportsAccess: true,
        isLogsAccess: true,
        isRolesAccess: true,
        isUsersAccess: true,
        isCoursesAccsess: true,
        isCertificatesAccess : true,
        isDashboardAccess: true, 
        isLibraryAccess : true,
       },
       {
        name: "المدير التنفيذي",
        adminId: admin.id,
        isStudentsAccess: true,
        isSchoolAccess: true,
        isReportsAccess: true,
        isRolesAccess: true,
        isUsersAccess: true,
        isCoursesAccsess: true,
        isCertificatesAccess : true,
        isDashboardAccess: true, 
        isLibraryAccess : true,
       },
       {
        name: "معلم",
        adminId: admin.id,
        name: "ادمن",
        isDevicesAccess: true,
        isStudentsAccess: true,
        isCoursesAccsess: true,
        isCertificatesAccess : true, 
        isLibraryAccess : true,
       }

      ]
    });
    return admin;
  },
  updateAdmin: async (_parent, { id, data }) => {
    if (data.email) data.email = data.email.toLowerCase();
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
    email = email.toLowerCase();
  
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!admin) {
      return new Error('No such user found');
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
    Team: async (parent) => {
      return await prisma.teams.findMany({
        where: {
          adminId: parent.id,
        },
      });
    },
    closeApps: async (parent) => {
      return await prisma.closeApp.findMany({
        where: {
          adminId: parent.id,
        },
      });
    },
    logs: async(parent)=>{
      return await prisma.logs.findMany({
        where:{
          adminId: parent.id
        }
      })
    },
    schools: async(parent)=>{
      return await prisma.school.findMany({
        where:{
          adminId: parent.id
        }
      })
    }
  }
};

module.exports = {
  adminQuery,
  adminMuation,
  adminRelation,
};
