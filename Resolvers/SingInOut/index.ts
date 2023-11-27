import prisma from "../../config/database"
type CreateSignInOutInput = {
    studentId: string
    signIn?: Date
    signOut?: Date
  }
type UpdateSignInOutInput = {
    studentId: string
    signIn?: Date
    signOut: Date
  }
const signInOutQueries = {
    signInOuts : async () => {
        return await prisma.signInOut.findMany({})
    },
    signInOut : async (_:undefined, args : {id: string}) =>{
        return await prisma.signInOut.findUnique({
            where: {
                id: args.id
            }
        })
    }
}

const signInOutMutations = {
    createSignInOut : async( _: undefined, args: {data : CreateSignInOutInput})=> {
        return await prisma.signInOut.create({
            data : args.data
        })
    },

    updateSignInOut : async(_: undefined, args: {id: string, data: UpdateSignInOutInput})=>{
        return await prisma.signInOut.update({
        where:{
            id: args.id
        },
        data : args.data
        })
    },
    deleteSignInOut : async(_: undefined, args: {id: string})=>{
        return await prisma.signInOut.delete({
            where:{
                id: args.id
            }
        })
    },
}

const signInOutRelation = {
    SignInOut : {
        student : async (parent : any) => {
            return await prisma.student.findUnique({
                where: {
                    studentId: parent.studentId,
                },
            
            })
        },

    }
}

export  {
    signInOutQueries,
    signInOutMutations,
    signInOutRelation
}