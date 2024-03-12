const prisma = require('../../config/database')
const { readFile } = require('../../Middlewares/file')

const schoolQuery = {
    schools: async(_, args, ctx)=>{
        return await prisma.school.findMany({
            where: {
                adminId: ctx.user.adminId
            }
        }) 
    },
    school: async(_, {schoolId} )=> {
        return await prisma.school.findUnique({
            where: {
                schoolId: schoolId
            }
        })
    },
    latestSchool: async(_, args, ctx)=>{
        return await prisma.school.findFirst({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                adminId: ctx.user.adminId
            }
        })
    },
}

const schoolMutations = {
    createSchool: async(_, {data, image}, ctx)=>{
        data.adminId = ctx.user.adminId
        if(image) data.imageUrl = await readFile(image);
        return await prisma.school.create({
           data
        })
    },
    updateSchool: async(_, {schoolId, data, image, removeImage}, ctx)=>{
        if(image) data.imageUrl = await readFile(image);
        if(removeImage) data.imageUrl = null;
        return await prisma.school.update({
            where: {
                schoolId: schoolId
            },
            data
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