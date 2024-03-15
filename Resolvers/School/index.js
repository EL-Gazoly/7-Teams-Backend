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
        const adminId= ctx.user.adminId
        data.adminId = adminId
        if(image) data.imageUrl = await readFile(image);
        const school =  await prisma.school.create({
           data
        })
        const secondary = await prisma.teams.create({
            data: {
                name: 'High',
                school: {
                    connect: {
                        schoolId: school.schoolId
                    }
                },
                admin: {
                    connect: {
                        id: adminId
                    }
                }
            }
        })
        const meduim = await prisma.teams.create({
            data: {
                name: 'Middle',
                school: {
                    connect: {
                        schoolId: school.schoolId
                    }
                },
                admin: {
                    connect: {
                        id: adminId
                    }
                }
            }
        })
        const primary = await prisma.teams.create({
            data: {
                name: 'Primary',
                school: {
                    connect: {
                        schoolId: school.schoolId
                    }
                },
                admin: {
                    connect: {
                        id: adminId
                    }
                }
            }
        })
        await prisma.classes.createMany({    
            data: [
                {
                    number: "first",
                    teamId: secondary.teamId
                },
                {
                    number: "second",
                    teamId: secondary.teamId
                },
                {
                    number: "third",
                    teamId: secondary.teamId
                },
                {
                    number: "first",
                    teamId: meduim.teamId
                },
                {
                    number: "second",
                    teamId: meduim.teamId
                },
                {
                    number: "third",
                    teamId: meduim.teamId
                },
                {
                    number: "first",
                    teamId: primary.teamId
                },
                {
                    number: "second",
                    teamId: primary.teamId
                },
                {
                    number: "third",
                    teamId: primary.teamId
                },{
                    number: "fourth",
                    teamId: primary.teamId
                },{
                    number: "fifth",
                    teamId: primary.teamId
                },
                {
                    number: "sixth",
                    teamId: primary.teamId
                }

            ]
        })
        if (ctx?.user?.userid !== undefined){
            await prisma.logs.create({
              data: {
                action: `Created School ${school.name}`,
                userId: ctx.user.userid,
                adminId: ctx.user.adminId,
              },
            })
          }
          else {
            await prisma.logs.create({
              data: {
                action: `Created School ${school.name}`,
                adminId: ctx.user.adminId,
              },
            })
          }
        return school
    },
    updateSchool: async(_, {schoolId, data, image, removeImage}, ctx)=>{
        if(image) data.imageUrl = await readFile(image);
        if(removeImage) data.imageUrl = null;
        const school =  await prisma.school.update({
            where: {
                schoolId: schoolId
            },
            data
        })
        if (ctx?.user?.userid !== undefined){
            await prisma.logs.create({
              data: {
                action: `Updated School ${school.name}`,
                userId: ctx.user.userid,
                adminId: ctx.user.adminId,
              },
            })
          }
          else {
            await prisma.logs.create({
              data: {
                action: `Updated School ${school.name}`,
                adminId: ctx.user.adminId,
              },
            })
          }
        return school
        
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