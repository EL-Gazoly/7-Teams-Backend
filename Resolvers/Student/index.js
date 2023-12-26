const prisma = require("../../config/database");
const { readFile } = require('../../Middlewares/file')
const studentQueries = {
  students: async () => {
    return await prisma.student.findMany({});
  },
  student: async (_parent, args) => {
    return await prisma.student.findUnique({
      where: {
        studentId: args.id,
      },
    });
  },
};

const studentMutations = {
  createStudent: async (_parent, args, ctx) => {
    const { data, image } = args;
    const { name, facilityId } = data;
    const studentId = await generateID(name, facilityId);
    data.generatedId = studentId;
    if(image) data.imageUrl = await readFile(image);
      data.adminId = ctx.user.adminId;
    return await prisma.student.create({
      data: data,
    });
  },

  updateStudent: async (_parent, args) => {
    const { id, data } = args;
    return await prisma.student.update({
      where: {
        studentId: id,
      },
      data: data,
    });
  },

  deleteStudent: async (_parent, args) => {
    return await prisma.student.delete({
      where: {
        studentId: args.id,
      },
    });
  },

  deleteManyStudents: async (_parent, args) => {
    return await prisma.student.deleteMany({
      where: {
        studentId: {
          in: args.ids,
        },
      },
    });
  },

  loginStudent: async (_parent, args) => {
    const { generatedId, macAddress } = args;
    const student =  await prisma.student.findFirst({
      where: {
        generatedId: generatedId,
      },
    });
    if (!student) {
      throw new Error('No such user found');
    }
    if (macAddress){
      const device = await prisma.device.findFirst({
        where: {
          macAddress: macAddress,
        },
      }); 
      if (!device){
        throw new Error('No such device found');
      }
      // update student and device 
      await prisma.student.update({ 
        where: {
          generatedId: generatedId,
        },
        data: {
          deviceId: device.deviceId,
        },
      });
      await prisma.device.update({
        where: {
          deviceId: device.deviceId,
        },
        data: {
          studentId: student.studentId,
        },
      });

      return student;
    }
  },
  logoutStudent: async (_parent, args) => {
    const { generatedId, macAddress } = args;
    const student =  await prisma.student.findFirst({
      where: {
        generatedId: generatedId,
      },
    });
    if (!student) {
      throw new Error('No such user found');
    }
    if (macAddress){
      const device = await prisma.device.findUnique({
        where: {
          macAddress: macAddress,
        },
      }); 
      if (!device){
        throw new Error('No such device found');
      }

      // update student and device 
      await prisma.student.update({ 
        where: {
          generatedId: generatedId,
        },
        data: {
          deviceId: null,
        },
      });
      await prisma.device.update({
        where: {
          deviceId: device.deviceId,
        },
        data: {
          studentId: null,
        },
      });

      return student;
    }
  }
};

const studentRelation = {
  Student: {
    admin: async (parent) => {
      return await prisma.admin.findUnique({
        where: {
          id: parent.adminId,
        },
      });
    },
    device: async (parent) => {
      return await prisma.device.findUnique({
        where: {
          studentId: parent.studentId,
        },
      });
    },
    studnetExpriment: async (parent) => {
      return await prisma.studentExpriment.findMany({
        where: {
          studentId: parent.studentId,
        },
      });
    },
    class: async (parent) => {
      return await prisma.classes.findUnique({
        where: {
          classId: parent.classId,
        },
      });
    },
    certificates: async (parent) => {
      return await prisma.certificates.findMany({
        where: {
          studentId: parent.studentId,
        },
      });
    },
  },
};

const generateID = async (name, facilityid) => {
  const uniqueString = `${name}${facilityid}`;
  return limitToFourDigits(await hashCode(uniqueString));
};

const hashCode = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return hash;
};

const limitToFourDigits = (num) => {
  return Math.abs(num % 10000); // 4 digits (10,000)
};

module.exports = {
  studentQueries,
  studentMutations,
  studentRelation,
};
