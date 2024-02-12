const prisma = require('../../config/database')

const logQueries = {
    logs: async (_parent, { pagination }) => {
        const { first, after } = pagination || {};
        let cursorDate;
        let take = 2; // Default value
        
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
          take,
          orderBy: {
            createdAt: 'asc', // Order by createdAt date
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

    },
};

module.exports = {
    logQueries,
    logMutations,
    logRelation,
}