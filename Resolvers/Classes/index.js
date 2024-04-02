const prisma = require('../../config/database.js')

const ClassesQueries = {
    classes: async (parent, args, context, info) => {
        return await prisma.classes.findMany()
    },
    class: async (parent, args, context, info) => {
        const { id } = args
        return await prisma.classes.findUnique({
            where: {
                classId: id
            }
        })
    },
    classesByNumber: async (parent, { number, name }, ctx) => {
        try {
          const teams = await prisma.teams.findMany({
            where: {
              name: name,
              adminId: ctx.user.adminId,
            },
          });
      
          const teamIds = teams.map((team) => team.teamId);
      
          const classes = await prisma.classes.findMany({
            where: {
              number: number,
              teamId: {
                in: teamIds,
              },
            },
          });
         
          return classes;
        } catch (err) {
          return err.message;
        }
      },
      
}

const ClassesMutations = {
    createClass: async (parent, args, context, info) => {
        const { number, teamId } = args.data
        return await prisma.classes.create({
            data: {
                number: number,
                teamId: teamId
            }
        })
    },
    updateClass: async (parent, args, context, info) => {
        const { classId, number, teamId } = args.data
        return await prisma.classes.update({
            where: {
                classId: classId
            },
            data: {
                number: number,
                teamId: teamId
            }
        })
    },
    deleteClass: async (parent, args, context, info) => {
        const { classId } = args.data
        return await prisma.classes.delete({
            where: {
                classId: classId
            }
        })
    }
}

const classesRelations = {
    Classes: {
        team: async (parent, args, context, info) => {
            return await prisma.teams.findUnique({
                where: {
                    teamId: parent.teamId
                }
            })
        },
        students: async (parent, args, context, info) => {
            return await prisma.student.findMany({
                where: {
                    classId: parent.classId
                }
            })
        },
        courses: async (parent, args, context, info) => {
            return await prisma.courses.findMany({
                where: {
                    classId: parent.classId
                }
            })
        }
    }
}

module.exports = {
    ClassesQueries,
    ClassesMutations,
    classesRelations
}