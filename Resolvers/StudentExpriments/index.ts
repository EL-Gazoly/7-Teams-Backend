import prisma from "../../config/database";

type CreateStudentExperimentInput = {
  studentId: string
  exprimentId: string
  progress: number
  practicalTestGrade: number
  theoreticalTestGrade: number
}
type UpdateStudentExperimentInput = {
  studentId: string
  exprimentId: string
  progress: number
  practicalTestGrade: number
  theoreticalTestGrade: number
}

const StudentExperimentQueries = {
    studentExperiments: async () => {
        return await prisma.studentExpriment.findMany()
    },
    studentExperiment: async (parent: any, args: any) => {
        const { id } = args
        return await prisma.studentExpriment.findUnique({
        where: {
            id
        }
        })
    }
}

const StudentExperimentMutations = {
    createStudentExperiment: async (parent: any, args: { data: CreateStudentExperimentInput }) => {
        const { data } = args
        return await prisma.studentExpriment.create({
        data
        })
    },
    updateStudentExperiment: async (parent: any, args: { id: string, data: UpdateStudentExperimentInput }) => {
        const { id, data } = args
        return await prisma.studentExpriment.update({
        where: {
            id
        },
        data
        })
    },
    deleteStudentExperiment: async (parent: any, args: { id: string }) => {
        const { id } = args
        return await prisma.studentExpriment.delete({
        where: {
            id
        }
        })
    }
}

const StudentExperimentRelation = {
    StudentExperiment : {
        student : async (parent : any) => {
            return await prisma.student.findUnique({
                where: {
                    studentId: parent.studentId,
                },
            
            })
        },
        expriment : async (parent : any) => {
            return await prisma.expriments.findUnique({
                where: {
                    ExprimentId: parent.exprimentId,
                },
            
            })
        }

    }
}

export {
    StudentExperimentQueries,
    StudentExperimentMutations,
    StudentExperimentRelation
}