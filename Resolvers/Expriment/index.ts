import prisma from "../../config/database";

type CreateExprimentInput = {
    name: string
    chatperNumber: number
  }
type UpdateExprimentInput = {
    name?: string
    chatperNumber?: number
  }

const exprimentQueries = {
    expriments : async () => {
        return await prisma.expriments.findMany({})
    },
    expriment : async (_:undefined, args : {id: string}) =>{
        return await prisma.expriments.findUnique({
            where: {
                ExprimentId: args.id
            }
        })
    }
}

const exprimentMutations = {
    createExpriment : async( _: undefined, args: {data : CreateExprimentInput})=> {
        return await prisma.expriments.create({
            data : args.data
        })
    },

    updateExpriment : async(_: undefined, args: {id: string, data: UpdateExprimentInput})=>{
        return await prisma.expriments.update({
        where:{
            ExprimentId: args.id
        },
        data : args.data
        })
    },
    deleteExpriment : async(_: undefined, args: {id: string})=>{
        return await prisma.expriments.delete({
            where:{
                ExprimentId: args.id
            }
        })
    },
}

const exprimentRelation = {
    Expriment : {
        StudentExpriment : async (parent : any) => {
            return await prisma.studentExpriment.findMany({
                where: {
                    exprimentId: parent.ExprimentId,
                },
            
            })
        }

    }
}

export  {
    exprimentQueries,
    exprimentMutations,
    exprimentRelation
}