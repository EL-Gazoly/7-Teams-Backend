const prisma = require("../../config/database");
const { readFile, readFileExcel } = require('../../Middlewares/file')
const excelToJson = require('convert-excel-to-json');
const { unlink } = require("fs");
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
    const studentId =  generateID(name, facilityId);
    data.generatedId = studentId.toString();
    if(image) data.imageUrl = await readFile(image);
      data.adminId = ctx.user.adminId;
    return await prisma.student.create({
      data: data,
    });
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
        throw new Error('No data found in the uploaded Excel file.');
      }
     
      unlink(excefile, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      
    const data = excelData.Sheet1.map((item) => {
      if (!item["first-name"] || !item["student-number"] || !item["team"] || !item["class"]) {
        throw new Error('Incomplete data. Please provide first name and last name.');
      }
      return {
        name: item["first-name"] + " " + item["middel-name"]+ " "+  item["last-name"],
        facilityId: item["student-number"],
        generatedId: item["secret-number"],
        team : item["team"],
        class: item["class"],
        adminId: ctx.user.adminId,
      }
    })
   
    data.forEach(async (item) => {
      if (item.generatedId === undefined || item.generatedId === null || item.generatedId === ""){
        item.generatedId =  generateID(item.name, item.facilityId);
      }
      item.generatedId = item.generatedId.toString()
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
      delete item.team
      delete item.class
    })
    if (data.length === 0) {
      throw new Error('No data found in the uploaded Excel file.');
    }
     const createdStudents = await prisma.student.createMany({
      data: data,
      skipDuplicates: true,
    });
  
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

  loginStudent: async (_parent, args) => {
    const { generatedId, macAddress } = args;
  
    const student = await prisma.student.findFirst({
      where: {
        generatedId: generatedId,
      },
    });
  
    if (!student) {
      throw new Error('No such user found');
    }
  
    if (macAddress) {
      const device = await prisma.device.findFirst({
        where: {
          macAddress: macAddress,
        },
      });
  
      if (!device) {
        throw new Error('No such device found');
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
