import Query from "./Queries/Query";
import Mutation from "./Mutaions"
import prisma from "../config/database";
const resolvers = {
    Query,
    Mutation,
    User: {
        student : async (parent : any) => {
            return await prisma.student.findMany({
                where: {
                    userId: parent.id,
                },
            
            })
        },
        devices : async (parent : any) => {
            return await prisma.device.findMany({
                where: {
                    userId: parent.id,
                },
            
            })
        },

      },
    Student : {
        user : async (parent : any) => {
            return await prisma.user.findUnique({
                where: {
                    id: parent.userId,
                },
            
            })
        },
        connectDevice : async (parent : any) => {
            return await prisma.device.findUnique({
                where: {
                    deviceId: parent.deviceId,
                },
            
            })
        },
      
        signInOUT : async (parent : any) => {
            return await prisma.signInOut.findMany({
                where: {
                    studentId: parent.id,
                },
            
            })
        },
        studnetExpriment : async (parent : any) => {
            return await prisma.studentExpriment.findMany({
                where: {
                    studentId: parent.id,
                },
            
            })
        },
        studentCategories : async (parent : any) => {
            return await prisma.studentCategories.findMany({
                where: {
                    studentId: parent.id,
                },
            
            })
        }

      },
    

};

export default resolvers;
