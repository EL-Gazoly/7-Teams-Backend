const prisma = require('../../config/database.js')

const teamQuery = {
    teams: async () => {
        return await prisma.teams.findMany();
    },
    team: async (_parent, { id }) => {
        return await prisma.teams.findUnique({
        where: {
            teamId: id,
        },
        });
    },
    
}

const teamMutation = {
    createTeam: async (_parent, { data }, ctx) => {
        data.adminId =  ctx.user.adminId;
        return await prisma.teams.create({
            data: data,
        });
    },
    updateTeam: async (_parent, { id, data }) => {
        const team = await prisma.teams.update({
            where: {
                id: id,
            },
            data: data,
        });
        return team;
    },
    deleteTeam: async (_parent, { id }) => {
        const team = await prisma.teams.delete({
            where: {
                id: id,
            },
        });
        return team;
    },
}

const teamRelation = {
    Teams: {
      classes: async (parent) => {
        return await prisma.classes.findMany({
          where: {
            teamId: parent.teamId,
          },
        });
      },

    students: async (parent) => {
        return await prisma.student.findMany({
        where: {
            teamId: parent.teamId,
        },
        });
    },
    admin: async (parent) => {
        return await prisma.admin.findUnique({
        where: {
            id: parent.adminId,
        },
        });
    },
    school: async (parent) => {
        return await prisma.school.findUnique({
            where: {
                schoolId: parent.schoolId
            }
        })
    }

    },
}

module.exports = {
    teamQuery,
    teamMutation,
    teamRelation,
}