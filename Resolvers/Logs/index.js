const prisma = require('../../config/database')

const logQueries = {
    logs: async () => {
        return await prisma.logs.findMany({});
    },
    log: async (_parent, args) => {
        return await prisma.logs.findUnique({
        where: {
            logId: args.id,
        },
        });
    },
    };

const logMutations = {
    createLog: async (_parent, args, ctx) => {
        const { data } = args;
        data.adminId = ctx.user.adminId;
                
        return await prisma.logs.create({
            data: data
        });
    },
    
    updateLog: async (_parent, args) => {
        const {logId, data } = args
        return await prisma.logs.update({
        where: {
            logId: logId,
        },
        data: {
            data: data,
        },
        });
    },
    deleteLog: async (_parent, args) => {
        const {logId, data } = args
        return await prisma.logs.delete({
        where: {
            logId: logId,
        },
        });
    },
};

const logRelation = {
    Logs: {
        admin: async (parent) => {
            return await prisma.admin.findUnique({
                where: {
                    id: parent.adminId,
                },
            });
        },

    },
};

module.exports = {
    logQueries,
    logMutations,
    logRelation,
}