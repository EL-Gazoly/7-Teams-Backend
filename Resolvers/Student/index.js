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
      const excelData = await  excelToJson({
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
     
      unlink(excefile, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      
    const data = excelData.Sheet1.map((item) => {
      if (!item["first-name"] || !item["middel-name"] ||  !item["last-name"] || !item["student-number"] || !item["team"] || !item["class"]) {
        return new Error('Incomplete data. Please provide all fields.');
      }
      return {
        name: item["first-name"] + " " + item["middel-name"]+ " "+ item["last-name"],
        facilityId: item["student-number"],
        password: item["secret-number"],
        team : item["team"],
        class: item["class"],
        schoolName: item["school-name"],
        classNumber: item["class-number"],
        adminId: ctx.user.adminId
      }
    })
   
    data.forEach(async (item) => {

      item.password = item.password.toString()
      item.facilityId = item.facilityId.toString()
     if(item.team==="ثانوي" || item.team == "الثانوي"){
      item.teamId = "1781aa8d-369d-4875-8a32-c8aac39ea543"
      if (item.class == 1 ){
        item.classId = "65d2322b-1d47-42b1-8739-f10a83378355"
      }
      else if (item.class == 2){
        item.classId = "056e7db3-66c1-450d-99b6-50c8206efc78"
      }
      else if (item.class == 3){
        item.classId = "5b9b06d4-2278-476c-a6f2-02dd366b18ef"
      }
     }
    else if(item.team==="متوسط" || item.team == "المتوسط"){
        item.teamId = "20f9b0c6-37fa-4509-987a-6be7b341d98e"
        if (item.class == 1){
          item.classId = "fad58648-c419-4701-985a-b8707446074b"
        }
        else if (item.class == 2){
          item.classId = "42e9c8a6-7c33-4ada-8215-65465a495912"
        }
        else if (item.class == 3){
          item.classId = "d401bb95-d5ad-4b34-ae7a-e5db984f2b14"
        }
      }
      else if (item.team==="ابتدائي" || item.team == "الابتدائي"){
        item.teamId = "d0be4668-a1b2-4ed5-a47b-fa3218a055b2"
        if (item.class == 1){
          item.classId = "299b30a9-cc2b-4d90-91c3-87a4e17c181e"
        }
        else if (item.class == 2){
          item.classId = "3005a5f7-c133-434e-be98-7dd3b78fedfd"
        }
        else if (item.class == 3){
          item.classId = "e713070c-853e-465d-9e72-0787f344147a"
        }
        else if (item.class == 4){
          item.classId = "6b10f49d-a110-420d-8595-9b8616d7c854"
        }
        else if (item.class == 5){
          item.classId = "1535cadc-70b9-4535-994b-e4c20c3912ae"
        }
        else if (item.class == 6){
          item.classId = "99b559a7-0e9d-40fb-a952-6c25895ceedf"
        }
      }
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
      delete item.classNumber
      delete item.team
      delete item.class
    })
   
    if (data.length === 0) {
      return new Error('No data found in the uploaded Excel file.');
    }
     const createdStudents = await prisma.student.createMany({
      data: data,
      skipDuplicates: true,
    });
    if (createdStudents.count > 0) {
        if (ctx?.user?.userid !== undefined){
          await prisma.logs.create({
            data: {
              action: `Created ${createdStudents.count} student using excel file`,
              userId: ctx.user.userid,
              adminId: ctx.user.adminId,
            },
          })
        }
        else {
          await prisma.logs.create({
            data: {
              action: `Created ${createdStudents.count} student using excel file`,
              adminId: ctx.user.adminId,
            },
          })
        }
  }
  
    return createdStudents.count;
 
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

const generateID =  (name, facilityid) => {
  const uniqueString = `${name}${facilityid}`;
  return limitToFourDigits(hashCode(uniqueString));
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