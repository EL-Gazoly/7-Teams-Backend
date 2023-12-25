const { expriment } = require('../../Graphql/Queries/Query')
const prisma = require('./../../config/database')

const ChapterQueries = {    
    chapters: async (parent, args, context, info) => {
        return await prisma.chatpers.findMany()
    },
    chapter: async (parent, args, context, info) => {
        const { chapterId } = args
        return await prisma.chatpers.findUnique({
            where: {
                chapterId: chapterId
            }
        })
    }
}

const ChapterMutations = {
    createChapter: async (parent, args, context, info) => {
        const { name, courseId } = args.data
        return await prisma.chatpers.create({
            data: {
                name: name,
                courseId: courseId
            }
        })
    },
    updateChapter: async (parent, args, context, info) => {
        const { chapterId, name, courseId } = args.data
        return await prisma.chatpers.update({
            where: {
                chapterId: chapterId
            },
            data: {
                name: name,
                courseId: courseId
            }
        })
    },
    deleteChapter: async (parent, args, context, info) => {
        const { chapterId } = args.data
        return await prisma.chatpers.delete({
            where: {
                chapterId: chapterId
            }
        })
    }
}

const ChapterRelations = {
    Chapters: {
        course: async (parent, args, context, info) => {
            return await prisma.courses.findUnique({
                where: {
                    courseId: parent.courseId
                }
            })
        },
        expriments: async (parent, args, context, info) => {
            return await prisma.expriments.findMany({
                where: {
                    chapterId: parent.chapterId
                }
            })
        }
    }

}

module.exports = {
    ChapterQueries,
    ChapterMutations,
    ChapterRelations
}