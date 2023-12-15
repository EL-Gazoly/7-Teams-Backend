const prisma = require("../../config/database");

const StudentCategoryQueries = {
  studentCategories: async () => {
    return await prisma.studentCategories.findMany();
  },
  studentCategory: async (_parent, args) => {
    const { id } = args;
    return await prisma.studentCategories.findUnique({
      where: {
        id,
      },
    });
  },
};

const StudentCategoryMutations = {
  createStudentCategory: async (_parent, args) => {
    const { data } = args;
    return await prisma.studentCategories.create({
      data,
    });
  },
  updateStudentCategory: async (_parent, args) => {
    const { id, data } = args;
    return await prisma.studentCategories.update({
      where: {
        id,
      },
      data,
    });
  },
  deleteStudentCategory: async (_parent, args) => {
    const { id } = args;
    return await prisma.studentCategories.delete({
      where: {
        id,
      },
    });
  },
};

const StudentCategoryRelation = {
  StudentCategory: {
    student: async (parent) => {
      return await prisma.student.findUnique({
        where: {
          studentId: parent.studentId,
        },
      });
    },
    categories: async (parent) => {
      return await prisma.categories.findUnique({
        where: {
          id: parent.categoryId,
        },
      });
    },
  },
};

module.exports = {
  StudentCategoryQueries,
  StudentCategoryMutations,
  StudentCategoryRelation,
};
