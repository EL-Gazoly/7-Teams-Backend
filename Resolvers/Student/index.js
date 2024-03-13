const prisma = require("../../config/database");
const { readFile, readFileExcel } = require('../../Middlewares/file')
const excelToJson = require('convert-excel-to-json');
const { unlink } = require("fs");
const studentQueries = {
  students: async () => {
    return await prisma.student.findMany({});
  },
  student: async (_parent, args) => {
    const student = await prisma.student.findFirst({
      where: {
        studentId: args.id,
      },
    });
    if (!student) {
      return new Error('No such user found');
    }
    return student;
  },
  studentByFacilityId: async (_parent, args) => {
    const student = await prisma.student.findFirst({
      where: {
        facilityId: args.facilityId,
      },
    });
    if (!student) {
      return new Error('No such user found');
    }
    return student;
  },
  StudentExpermientByPeriod: async (_parent, args) => {
    const { studentId } = args;
    const today = new Date();
    const expriemntsByDay = prisma.studentExpriment.findMany({
      where: {
        studentId,
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()) ,
          lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        }
      }
    });

    const expriementsByMonth = prisma.studentExpriment.findMany({
      where: {
        studentId,
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1) ,
          lt: new Date(today.getFullYear(), today.getMonth() + 1, 1)
        }
      }
    });

    const expriementsByYear = prisma.studentExpriment.findMany({
      where: {
        studentId,
        createdAt: {
          gte: new Date(today.getFullYear(), 0, 1) ,
          lt: new Date(today.getFullYear() + 1, 0, 1)
        }
      }
    });

    return {
      expriemntsByDay ,
      expriementsByMonth,
      expriementsByYear
    }
  },
};

const studentMutations = {
  createStudent: async (_parent, args, ctx) => {
    const { data, image } = args;
    if(image) data.imageUrl = await readFile(image);
      data.adminId = ctx.user.adminId;
    const student = await prisma.student.create({
      data: data,
    });
    if (ctx?.user?.userid !== undefined){
      await prisma.logs.create({
        data: {
          action: `Created student ${student.name}`,
          userId: ctx.user.userid,
          adminId: ctx.user.adminId,
        },
      })
    }
    else {
      await prisma.logs.create({
        data: {
          action: `Created student ${student.name}`,
          adminId: ctx.user.adminId,
        },
      })
    }
    return student;
  },

  uploadStudentByExcel: async (_parent, args, ctx) => {
    const { file } = args;
    const excefile = await readFileExcel(file);
    const excelData = await excelToJson({
      sourceFile: excefile,
      header: {
        rows: 1
      },
      columnToKey: {
        '*': '{{columnHeader}}'
      }
    });
  
    if (!excelData || !excelData.Sheet1 || excelData.Sheet1.length === 0) {
      throw new Error('No data found in the uploaded Excel file.');
    }
  
    const schoolTeamsCache = {};
  
    const data = excelData.Sheet1.map((item) => {
      if (!item["first-name"] || !item["middel-name"] || !item["last-name"] || !item["student-number"] || !item["team"] || !item["class"]) {
        throw new Error('Incomplete data. Please provide all fields.');
      }
      return {
        name: `${item["first-name"]} ${item["middel-name"]} ${item["last-name"]}`,
        facilityId: item["student-number"].toString(),
        password: item["secret-number"].toString(),
        team: item["team"],
        class: item["class"],
        schoolId: item["school-id"],
        adminId: "a20f6805-417b-49cf-9832-8c8c6f97af18"
      };
    });
  
    await Promise.all(data.map(async (item) => {
      let schoolId = schoolTeamsCache[item.schoolId];
      if (!schoolId) {
        const school = await prisma.school.findUnique({
          where: {
            uniqueId: item.schoolId
          }
        });
        if (!school) {
          throw new Error(`School with uniqueId ${item.schoolId} not found.`);
        }
        schoolId = school.schoolId;
        schoolTeamsCache[item.schoolId] = schoolId;
      }
      const teamName = getTeamName(item.team);
      let teamId = schoolTeamsCache[`${schoolId}-${teamName}`];
      if (!teamId) {
        const team = await prisma.teams.findFirst({
          where: {
            schoolId,
            name: teamName
          }
        });
        if (!team) {
          throw new Error(`Team ${teamName} not found for school ${item.schoolId}.`);
        }
        teamId = team.teamId;
        schoolTeamsCache[`${schoolId}-${teamName}`] = teamId;
      }
      item.teamId = teamId;
  
      // Logic for classId
      const classNumberMap = {
        1: "first",
        2: "second",
        3: "third",
        4: "fourth",
        5: "fifth",
        6: "sixth"
      };
      const classNumber = classNumberMap[item.class] || "first";
      const classes = await prisma.classes.findMany({
        where: {
          teamId: item.teamId,
          number: classNumber
        }
      });
      if (!classes || classes.length === 0) {
        throw new Error(`Class ${classNumber} not found for team ${teamName}.`);
      }
      item.classId = classes[0].classId;
  
      // Logic for classalpha
      const classAlphaMap = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E",
        6: "F",
        7: "G",
        8: "H",
        9: "I",
        10: "J"
      };
      item.classalpha = classAlphaMap[item.classNumber] || "A";
  
      delete item.schoolId;
      delete item.classNumber;
      delete item.team;
      delete item.class;
    }));
  
    if (data.length === 0) {
      throw new Error('No data found in the uploaded Excel file.');
    }
  
    const createdStudents = await prisma.student.createMany({
      data,
      skipDuplicates: true,
    });
  
    return createdStudents.count;
  }
  
,

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

  loginStudent: async (_parent, args, ctx) => {
    const { facilityId, macAddress, password } = args;
  
    const student = await prisma.student.findFirst({
      where: {
        facilityId: facilityId,
      },
    });
  
    if (!student) {
      return new Error('No such user found');
    }
    if (password !== student.password) {
      return Error('Incorrect password');
    }
  
    if (macAddress) {
      const device = await prisma.device.findFirst({
        where: {
          macAddress: macAddress,
        },
      });
  
      if (!device) {
        return new Error('No such device found');
      }
  
      const oldStudent = await prisma.student.findFirst({
        where: {
          deviceId: device.deviceId,
        },
      });
  
      if (oldStudent) {
        await prisma.student.update({
          where: {
            studentId: oldStudent.studentId,
          },
          data: {
            deviceId: null,
          },
        });
      }
  
      const oldDevice = await prisma.device.findFirst({
        where: {
          studentId: student.studentId,
        },
      });
  
      if (oldDevice) {
        await prisma.device.update({
          where: {
            deviceId: oldDevice.deviceId,
          },
          data: {
            studentId: null,
          },
        });
      }
  
      await prisma.student.update({
        where: {
          studentId: student.studentId,
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

      if (ctx?.user?.userid !== undefined){
        await prisma.logs.create({
          data: {
            action: `student ${student.name} logged in using device ${macAddress}`,
            userId: ctx.user.userid,
            adminId: ctx.user.adminId,
          },
        })
      }
      else {
        await prisma.logs.create({
          data: {
            action: `student ${student.name} logged in using device ${macAddress}`,
            adminId: ctx.user.adminId,
          },
        })
      }
  
      return student;
    }
  },
  
  logoutStudent: async (_parent, args, ctx) => {
    const { facilityId, macAddress } = args;
    const student =  await prisma.student.findFirst({
      where: {
        facilityId: facilityId,
      },
    });
    if (!student) {
      return new Error('No such user found');
    }
    if (macAddress){
      const device = await prisma.device.findUnique({
        where: {
          macAddress: macAddress,
        },
      }); 
      if (!device){
        return new Error('No such device found');
      }

      // update student and device 
      await prisma.student.update({ 
        where: {
          studentId: student.studentId,
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

      if (ctx?.user?.userid !== undefined){
        await prisma.logs.create({
          data: {
            action: `student ${student.name} logged out using device ${macAddress}`,
            userId: ctx.user.userid,
            adminId: ctx.user.adminId,
          },
        })
      }
      else {
        await prisma.logs.create({
          data: {      
            action: `student ${student.name} logged out using device ${macAddress}`,
            adminId: ctx.user.adminId,
          },
        })
      }

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
    closeApps: async (parent) => {
      return await prisma.closeApp.findMany({
        where: {
          studentId: parent.studentId,
        },
      });
    },
    team: async (parent) => {
      return await prisma.teams.findUnique({
        where: {
          teamId: parent.teamId,
        },
      });
    },
  },
 
};

function getTeamName(team) {
  switch (team) {
    case "ثانوي":
    case "الثانوي":
      return "High";
    case "متوسط":
    case "المتوسط":
      return "Middle";
    case "ابتدائي":
    case "الابتدائي":
      return "Primary";
    default:
      return null;
  }
}


module.exports = {
  studentQueries,
  studentMutations,
  studentRelation,
};