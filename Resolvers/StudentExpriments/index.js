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
    const studentExperiment = await prisma.studentExpriment.findFirst({
      where: {
        exprimentId: data.exprimentId,
        studentId: data.studentId,
      }
    })
    if (!studentExperiment) {
      return await prisma.studentExpriment.create({
        data,
      });
    }
    return await prisma.studentExpriment.update({
      where: {
        id: studentExperiment.id,
      },
      data,
    })
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
