import prisma from "../../config/database"

type CreateStudentInput = {
    generatedId: number
    name: string
    facilityId: string
    imageUrl?: string
    TotalTime?: number
    completedCourses?: number
    userId: string
    deviceId?: string
  }
type UpdateStudentInput = {
    name?: string
    facilityId?: string
    imageUrl?: string
    TotalTime?: number
    completedCourses?: number
    userId?: string
    deviceId?: string
  }

const studentQueries = {
    students : async () => {
        return await prisma.student.findMany({})
    },
    student : async (_:undefined, args : {id: string}) =>{
        return await prisma.student.findUnique({
            where: {
                studentId: args.id
            }
        })
    }
}

const studentMutations = {
    createStudent : async( _: undefined, args: {data : CreateStudentInput})=> {
        const {name, facilityId} = args.data;
        const studentId = await generateID(name, facilityId);
        args.data.generatedId = studentId;
        return await prisma.student.create({
            data : args.data
        })
    },

    updateStudent : async(_: undefined, args: {id: string, data: UpdateStudentInput})=>{
        return await prisma.student.update({
        where:{
            studentId: args.id
        },
        data : args.data
        })
    },
    deleteStudent : async(_: undefined, args: {id: string})=>{
        return await prisma.student.delete({
            where:{
                studentId: args.id
            }
        })
    },

    deleteManyStudents : async(_: undefined, args: {ids: string[]})=>{
        return await prisma.student.deleteMany({
            where:{
                studentId: {
                    in: args.ids
                }
            }
        })
    }
}

const studentRelation = {
    Student : {
        user : async (parent : any) => {
            return await prisma.user.findUnique({
                where: {
                    id: parent.userId,
                },
            
            })
        },
        device : async (parent : any) => {
            return await prisma.device.findMany({
                where: {
                    studentId: parent.studentId,
                },
            
            })
        },
      
        signInOUT : async (parent : any) => {
            return await prisma.signInOut.findMany({
                where: {
                    studentId: parent.studentId,
                },
            
            })
        },
        studnetExpriment : async (parent : any) => {
            return await prisma.studentExpriment.findMany({
                where: {
                    studentId: parent.studentId,
                },
            
            })
        },
        studentCategories : async (parent : any) => {
            return await prisma.studentCategories.findMany({
                where: {
                    studentId: parent.studentId,
                },
            
            })
        }

      },
}

const generateID = async (name: string, facilityid : string) => {
    const uniqueString = `${name}${facilityid}`;
    return limitToFourDigits(await hashCode(uniqueString));
  };
  
  const hashCode = (str: string) => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash;
    }
    return hash;
  };
  const limitToFourDigits = (num : number) => {
    return Math.abs(num % 10000); // 4 digits (10,000)
  };

export {
    studentQueries,
    studentMutations,
    studentRelation
}