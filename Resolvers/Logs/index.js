const prisma = require('../../config/database')

const logQueries = {
    logs: async (_parent, { pagination }, ctx, args) => {
        const { first, after } = pagination || {};
        const { skip, take } = args.variableValues;
        let cursorDate;
        
        if (first) {
          take = first;
        }
    
        if (after) {
          // Convert the after cursor to a Date object if necessary
          cursorDate = new Date(after);
        }
    
        // Define the pagination condition based on the cursor date
        const paginationCondition = cursorDate ? {
          createdAt: {
            gt: cursorDate,
          },
        } : {};
    
        // Fetch logs with pagination parameters
        const logs = await prisma.logs.findMany({
          ...paginationCondition,
          skip,
          take,
          orderBy: {
            createdAt: 'asc', // Order by createdAt date
          },
          where: {
            adminId: ctx.user.adminId,
          },
        });
    
        return logs;
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
        user: async (parent) => {
            if (!parent.userId) return null;
            return await prisma.user.findUnique({
                where: {
                    id: parent.userId,
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