import prisma from "../../config/database"
type CreateCategoriesInput = {
    name: string
  }
  type UpdateCategoriesInput = {
    name: string
  }


const CategoriesQueries = {
    categories: async () => {
        return await prisma.categories.findMany()
    },
    category: async (parent: any, args: any) => {
        const { id } = args
        return await prisma.categories.findUnique({
        where: {
            id
        }
        })
    }
}

const CategoriesMutations = {
    createCategories: async (parent: any, args: { data: CreateCategoriesInput }) => {
        const { data } = args
        return await prisma.categories.create({
        data
        })
    },
    updateCategories: async (parent: any, args: { id: string, data: UpdateCategoriesInput }) => {
        const { id, data } = args
        return await prisma.categories.update({
        where: {
            id
        },
        data
        })
    },
    deleteCategories: async (parent: any, args: { id: string }) => {
        const { id } = args
        return await prisma.categories.delete({
        where: {
            id
        }
        })
    }
}

export {
    CategoriesQueries,
    CategoriesMutations
}

