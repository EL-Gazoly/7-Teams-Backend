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
    const { schoolId, teamName , classNumber } = data;
    const school = await prisma.school.findUnique({
      where: {
        schoolId: schoolId,
      }
    });

    if (!school) {
      return new Error(`School with id ${schoolId} not found.`);
    }

    const team = await prisma.teams.findFirst({
      where: {
        schoolId: schoolId,
        name: teamName,
      }
    });

    if (!team) {
      return new Error(`Team with name ${teamName} not found for school ${schoolId}.`);
    }

    const classes = await prisma.classes.findMany({
      where: {
        teamId: team.teamId,
        number: classNumber
      }
    });

    if (!classes || classes.length === 0) {
      return new Error(`Class ${classNumber} not found for team ${teamName}.`);
    }

    data.teamId = team.teamId;
    data.classId = classes[0].classId;

    delete data.schoolId;
    delete data.teamName;
    delete data.classNumber;


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
    return new Error('No data found in the uploaded Excel file.');
  }
  const schoolTeamsCache = {};

  const data = excelData.Sheet1.map((item) => {
    if (!item["first-name"] || !item["middel-name"] ||  !item["last-name"] || !item["student-number"] || !item["team"] || !item["class"]) {
      return new Error('Incomplete data. Please provide all fields.');
    }
    return {
      name: item["first-name"] + " " + item["middel-name"]+ " "+ item["last-name"],
      facilityId: item["student-number"],
      password: item["secret-number"],
      team: item["team"],
      class: item["class"],
      schoolId: item["school-id"],
      classNumber: item["class-number"],
      adminId: ctx.user.adminId,
    };
  });



  await Promise.all(data.map(async (item) => {
    item.password = item.password.toString()
    item.facilityId = item.facilityId.toString()
    let schoolId;
    if (schoolTeamsCache[item.schoolId]) {
      schoolId = schoolTeamsCache[item.schoolId];
    } else {
      const school = await prisma.school.findUnique({
        where: {
          uniqueId : item.schoolId
        }
      });
      if (!school) {
        throw new Error(`School with uniqueId ${item.schoolId} not found.`);
      }
      schoolId = school.schoolId;
      schoolTeamsCache[item.schoolId] = schoolId;
    }

    let teamId;
    const teamName = getTeamName(item.team);
    if (schoolTeamsCache[`${schoolId}-${teamName}`]) {
      teamId = schoolTeamsCache[`${schoolId}-${teamName}`];
    } else {
      const team = await prisma.teams.findFirst({
        where: {
          schoolId: schoolId,
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
    // Your classId logic here...
    let classNumber;
  switch (item.class) {
    case 1:
      classNumber = "first";
      break;
    case 2:
      classNumber = "second";
      break;
    case 3:
      classNumber = "third";
      break;
    case 4:
      classNumber = "fourth";
      break;
    case 5:
      classNumber = "fifth";
      break;
    case 6:
      classNumber = "sixth";
      break;
    default:
      classNumber = "first";
      break;

      
  }
  const classes = await prisma.classes.findMany({
    where: {
      teamId: item.teamId,
      number: classNumber
    }
  });

  if (!classes || classes.length === 0) {
    throw new Error(`Class ${classNumber} not found for team ${item.team}.`);
  }

  item.classId = classes[0].classId;
  
  switch (item.classNumber) {
    case 1:
      item.classalpha = "A"
      break;
    case 2:
      item.classalpha = "B"
      break;
    case 3:
      item.classalpha = "C"
      break;
    case 4:
      item.classalpha = "D"
      break;
    case 5:
      item.classalpha = "E"
      break;
    case 6:
      item.classalpha = "F"
      break;
    case 7:
      item.classalpha = "G"
      break;
    case 8:
      item.classalpha = "H"
      break;
    case 9:
      item.classalpha = "I"
      break;
    case 10:
      item.classalpha = "J"
      break;
    default:
      item.classalpha = "A"
      break;

  }
    delete item.schoolId
    delete item.classNumber
    delete item.team
    delete item.class


  }));

  if (data.length === 0) {
    return new Error('No data found in the uploaded Excel file.');
  }

  const createdStudents = await prisma.student.createMany({
    data: data,
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