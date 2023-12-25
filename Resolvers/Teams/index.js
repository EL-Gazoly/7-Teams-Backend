const prisma = require('../../config/database.js')

const teamQuery = {
    teams: async () => {
        return await prisma.teams.findMany();
    },
    team: async (_parent, { id }) => {
        return await prisma.teams.findUnique({
        where: {
            id: id,
        },
        });
    },
    
}

const teamMutation = {
    createTeam: async (_parent, { data }) => {
        const team = await prisma.teams.create({
            data: data,
        });
        return team;
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

    },
}

module.exports = {
    teamQuery,
    teamMutation,
    teamRelation,
}