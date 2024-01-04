const prisma = require("../../config/database");

const StudentExperimentQueries = {
  studentExperiments: async () => {
    return await prisma.studentExpriment.findMany();
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
