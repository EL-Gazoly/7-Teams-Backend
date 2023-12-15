const prisma = require("../../config/database");

const signInOutQueries = {
  signInOuts: async () => {
    return await prisma.signInOut.findMany({});
  },
  signInOut: async (_parent, args) => {
    return await prisma.signInOut.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};

const signInOutMutations = {
  createSignInOut: async (_parent, { data }) => {
    return await prisma.signInOut.create({
      data: data,
    });
  },

  updateSignInOut: async (_parent, { id, data }) => {
    return await prisma.signInOut.update({
      where: {
        id: id,
      },
      data: data,
    });
  },
  deleteSignInOut: async (_parent, { id }) => {
    return await prisma.signInOut.delete({
      where: {
        id: id,
      },
    });
  },
};

const signInOutRelation = {
  SignInOut: {
    student: async (parent) => {
      return await prisma.student.findUnique({
        where: {
          studentId: parent.studentId,
        },
      });
    },
  },
};

module.exports = {
  signInOutQueries,
  signInOutMutations,
  signInOutRelation,
};
