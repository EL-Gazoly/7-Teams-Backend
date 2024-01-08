const prisma = require('../../config/database')

const CoursesQuery = {
    courses: async () => {
        return await prisma.courses.findMany()
    },
    course: async (parent, args) => {
        return await prisma.courses.findUnique({
            where: {
                id: args.id
            }
        })
    }
}

const CourseMutation = {
    createCourse: async (parent, args) => {
        const {data}  = args
        return await prisma.courses.create({
            data
        })
    },
    updateCourse: async (parent, args) => {
        const { data, id}= args
        return await prisma.courses.update({
            where: {
                courseId: id
            },
            data
        })
    },
    deleteCourse: async (parent, args) => {
        const { id } = args
        return await prisma.courses.delete({
            where: {
                courseId: id
            }
        })
    }
}

const CourseRelation = {
    Courses: {
        chapters : async (parent) => {
            return await prisma.chatpers.findMany({
                where: {
                    courseId: parent.courseId
                }
            })
        }
    }
}


module.exports = {
    CoursesQuery,
    CourseMutation,
    CourseRelation
}