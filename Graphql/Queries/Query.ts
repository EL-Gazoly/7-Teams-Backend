import prisma from "../../config/database";
import {userQuery} from '../../Resolvers';
const Query = {
    ...userQuery,
    devices : async () => {
        return await prisma.device.findMany();
    },
    device : async ( args: {id : string} ) => {
        return await prisma.device.findUnique({
            where: {
                deviceId: args.id,
            },
        })
    },
    students : async () => {
        return await prisma.student.findMany();
    },
    student : async ( args: {id : string} ) => {
        return await prisma.student.findUnique({
            where: {
                studentId: args.id,
            },
        })
    },
    signInOuts : async () => {
        return await prisma.signInOut.findMany();
    },
    categories : async () => {
        return await prisma.categories.findMany();
    },
    experiments : async () => {
        return await prisma.expriments.findMany();
    },
    experiment : async ( args: {id : string} ) => {
        return await prisma.expriments.findUnique({
            where: {
                ExprimentId : args.id,
            },
        })
    },
    studentExperiments : async () => {
        return await prisma.studentExpriment.findMany();
    },
    studentExperimentsByStudentId
    
    : async ( args: {studentId : string} ) => {
        return await prisma.studentExpriment.findMany({
            where: {
                studentId : args.studentId,
            },
        })
    },
}

export default Query;