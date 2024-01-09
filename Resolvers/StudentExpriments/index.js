const prisma = require("../../config/database");

const StudentExperimentQueries = {
  studentExperiments: async () => {
    const today = new Date();
    const expriemntsByDay = prisma.studentExpriment.findMany({
      where: {
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()) ,
          lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        }
      }
    });

    const expriementsByMonth = prisma.studentExpriment.findMany({
      where: {
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1) ,
          lt: new Date(today.getFullYear(), today.getMonth() + 1, 1)
        }
      }
    });

    const expriementsByYear = prisma.studentExpriment.findMany({
      where: {
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
  studentExperiment: async (_parent, args) => {
    const { studentId, exprimentId } = args;
    return await prisma.studentExpriment.findFirst({
      where: {
        studentId,
        exprimentId,
      },
    });
  },
  timeByMonth: async (_parent, args) => {
    const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate()+ 1); 
      // handel january case
      if (today.getMonth() === 0) {
        lastMonth.setFullYear(today.getFullYear() - 1);
      }
      const expriemntsByMonth = await prisma.studentExpriment.findMany({
        where: {
          createdAt: {
            gte: lastMonth,
            lt: thisMonth
          }
        }
      });
      const weeks = []; 
      for (let i = 0; i < 8; i++) {
        weeks.push({
          start : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7 * i + 1),
          end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7 * (i + 1))
        })
      }
      
      const expriemntsByWeek = weeks.map(week => {
        return expriemntsByMonth.filter(expriemnt => {
          return expriemnt.createdAt >= week.end && expriemnt.createdAt < week.start
        })
      })
      const timeByMonth = await expriemntsByWeek.map(expriemnts => {
        return expriemnts.reduce((total, expriemnt) => {
          return total + expriemnt.totalTrainingTime + expriemnt.totalTheorticalTime + expriemnt.totalPraticalTime
        }, 0)
      })
      return timeByMonth

  },
  studentActuallyBegein: async (_parent, args, ctx) => {
    const adminId = ctx.user.adminId;
    const students = await prisma.student.findMany({
      where: {
        adminId
      }
    });
    
    const studentWithExpriment = await Promise.all(students.map(async student => {
      return prisma.studentExpriment.findMany({
        where: {
          studentId: student.studentId
        }
      });
    }));
    
    const studentWithExprimentFiltered = studentWithExpriment.filter(student => student && student.length > 0);
    let total = 0;
    studentWithExprimentFiltered.forEach(student => {
      student.forEach(expriment => {
        total += expriment.totalPraticalTime + expriment.totalTheorticalTime + expriment.totalTrainingTime
      })
    });
    

  const studentWithCertification = await Promise.all(studentWithExprimentFiltered.map(async student => {
    const certification = await prisma.certificates.findFirst({
      where: {
        studentId: student.studentId
      }
    })
    if (certification) {
      return student
    }
  }
  ))
  const studentWithCertificationFiltered = studentWithCertification.filter(student => student)

   

  
  return [
    students.length,
    studentWithExprimentFiltered.length,
    studentWithCertificationFiltered.length,
    total
  ]
  },
};

const StudentExperimentMutations = {
  createStudentExperiment: async (_parent, args) => {
    const { data } = args;
    return await prisma.studentExpriment.create({
      data,
    });
  },
  updateStudentExperiment: async (_parent, args) => {
    const { data } = args;
    const today = new Date();
    const createdToday =  await prisma.studentExpriment.findMany({
      where: {
        studentId: data.studentId,
        exprimentId: data.exprimentId,
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()) ,
          lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        }
      }
    })
    if (createdToday.length === 0) {
      return await prisma.studentExpriment.create({
        data,
      });
    }
    return await prisma.studentExpriment.update({
      where: {
        id: createdToday[0].id,
      },
      data,
    });
  },
  deleteStudentExperiment: async (_parent, args) => {
    const { id } = args;
    return await prisma.studentExpriment.delete({
      where: {
        id,
      },
    });
  },
};

const StudentExperimentRelation = {
  StudentExperiment: {
    student: async (parent) => {
      return await prisma.student.findUnique({
        where: {
          studentId: parent.studentId,
        },
      });
    },
    expriment: async (parent) => {
      return await prisma.expriments.findUnique({
        where: {
          exprimentId: parent.exprimentId,
        },
      });
    },
  },
};

module.exports = {
  StudentExperimentQueries,
  StudentExperimentMutations,
  StudentExperimentRelation,
};
