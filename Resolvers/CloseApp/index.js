const prisma = require("../../config/database");

const closeAppQuery = {
    closeApps: async (_, _args, ctx) => {
        const adminId = ctx.user.adminId;
        return await prisma.closeApp.findMany({
            where: {
                adminId,
            },
        });
    },
    closeApp: async (_parent, args) => {
        return await prisma.closeApp.findUnique({
        where: {
            closeAppId: args.id,
        },
        });
    },
};

const closeAppMutation = {
    createCloseApp: async (_parent, { data }, ctx) => {
        data.adminId = ctx.user.adminId;
        return await prisma.closeApp.create({
        data,
        });
    },
    updateCloseApp: async (_parent, { id, data }) => {
        return await prisma.closeApp.update({
        where: {
            closeAppId: id,
        },
        data,
        });
    },
    deleteCloseApp: async (_parent, { id }) => {
        return await prisma.closeApp.delete({
        where: {
            closeAppId: id,
        },
        });
    },

}

const closeAppRelation = {
    CloseApp: {
        admin: async (parent) => {
            return await prisma.admin.findUnique({
                where: {
                    id: parent.adminId,
                },
            });
        },
        student: async (parent) => {
            return await prisma.student.findUnique({
              where: {
                studentId: parent.studentId,
              },
            });
          },
    },
};

module.exports = {
    closeAppQuery,
    closeAppMutation,
    closeAppRelation,
};