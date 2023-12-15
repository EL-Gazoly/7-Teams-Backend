const prisma = require("../../config/database");

const CategoriesQueries = {
  categories: async () => {
    return await prisma.categories.findMany();
  },
  category: async (_parent, args) => {
    const { id } = args;
    return await prisma.categories.findUnique({
      where: {
        id,
      },
    });
  },
};

const CategoriesMutations = {
  createCategories: async (_parent, { data }) => {
    return await prisma.categories.create({
      data,
    });
  },
  updateCategories: async (_parent, { id, data }) => {
    return await prisma.categories.update({
      where: {
        id,
      },
      data,
    });
  },
  deleteCategories: async (_parent, { id }) => {
    return await prisma.categories.delete({
      where: {
        id,
      },
    });
  },
};

const CategoriesRelation = {
  Categories: {
    StudentCategory: async (parent) => {
      return await prisma.studentCategories.findMany({
        where: {
          categoryId: parent.id,
        },
      });
    },
  },
};

module.exports = {
  CategoriesQueries,
  CategoriesMutations,
  CategoriesRelation,
};
