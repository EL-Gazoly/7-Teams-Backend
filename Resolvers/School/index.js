const prisma = require('../../config/database')

const schoolQuery = {
    schools: async()=>{
        return await prisma.school.findMany() 
    },
    school: async(_, {schoolId} )=> {
        return await prisma.school.findUnique({
            where: {
                schoolId: schoolId
            }
        })
    }
}

const schoolMutations = {
    createSchool: async(_, {data}, ctx)=>{
        data.adminId = ctx.user.adminId
        return await prisma.school.create({
           data
        })
    },
    updateSchool: async(_, {schoolId, name}, ctx)=>{
        return await prisma.school.update({
            where: {
                schoolId: schoolId
            },
            name: name
        })
    },
    deleteCertificate: async(_, {schoolId})=>{
        return await prisma.school.delete({
            where: {
                schoolId: schoolId
            }
        })
    }
}

const schoolRelations = {
    School: {
        teams: async (parent)=> {
            return await prisma.teams.findMany({
                where: {
                    schoolId: parent.schoolId
                }
            })
        },
        admin: async(parent) => {
            return await prisma.admin.findUnique({
                where: {
                    id: parent.adminId
                }
            })
        }
    }
}

module.exports = {
    schoolQuery,
    schoolMutations,
    schoolRelations
}