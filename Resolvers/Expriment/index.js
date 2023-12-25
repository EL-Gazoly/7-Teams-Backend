const { chapter } = require("../../Graphql/Queries/Query");
const prisma = require("../../config/database");

const exprimentQueries = {
  expriments: async () => {
    return await prisma.expriments.findMany({});
  },
  expriment: async (_parent, args) => {
    return await prisma.expriments.findUnique({
      where: {
        exprimentId: args.id,
      },
    });
  },
};

const exprimentMutations = {
  createExpriment: async (_parent, { data }) => {
    return await prisma.expriments.create({
      data,
    });
  },
  updateExpriment: async (_parent, { id, data }) => {
    return await prisma.expriments.update({
      where: {
        exprimentId: id,
      },
      data,
    });
  },
  deleteExpriment: async (_parent, { id }) => {
    return await prisma.expriments.delete({
      where: {
        exprimentId: id,
      },
    });
  },
};

const exprimentRelation = {
  Expriment: {
    StudentExpriment: async (parent) => {
      return await prisma.studentExpriment.findMany({
        where: {
          exprimentId: parent.exprimentId,
        },
      });
    },
    chapter: async (parent) => {
      return await prisma.chatpers.findUnique({
        where: {
          chapterId: parent.chapterId,
        },
      });
    }, 

  },
};

module.exports = {
  exprimentQueries,
  exprimentMutations,
  exprimentRelation,
};
