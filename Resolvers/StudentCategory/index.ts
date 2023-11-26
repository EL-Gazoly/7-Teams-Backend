import prisma from "../../config/database"
type CreateStudentCategoryInput = {
    studentId: string
    categoryId: string
    classNumber: number
  }
  type UpdateStudentCategoryInput = {
    studentId?: string
    categoryId?: string
    classNumber?: number
  }
  
    const StudentCategoryQueries = {
        studentCategories: async () => {
            return await prisma.studentCategories.findMany()
        },
        studentCategory: async (parent: any, args: any) => {
            const { id } = args
            return await prisma.studentCategories.findUnique({
            where: {
                id
            }
            })
        }
    }

    const StudentCategoryMutations = {
        createStudentCategory: async (parent: any, args: { data: CreateStudentCategoryInput }) => {
            const { data } = args
            return await prisma.studentCategories.create({
            data
            })
        },
        updateStudentCategory: async (parent: any, args: { id: string, data: UpdateStudentCategoryInput }) => {
            const { id, data } = args
            return await prisma.studentCategories.update({
            where: {
                id
            },
            data
            })
        },
        deleteStudentCategory: async (parent: any, args: { id: string }) => {
            const { id } = args
            return await prisma.studentCategories.delete({
            where: {
                id
            }
            })
        }
    }

    export {
        StudentCategoryQueries,
        StudentCategoryMutations
    }