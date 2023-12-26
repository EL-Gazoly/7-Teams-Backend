const prisma = require('../../config/database');

const certificatesQuery = {
    certificates: async () => {
        const certificates = await prisma.certificates.findMany();
        return certificates;
    },
    certificate: async (_, { id }) => {
        const certificate = await prisma.certificates.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return certificate;
    },
}

const certificatesMutation = {
    createCertificate: async (_, { data} ) => {
        const certificate = await prisma.certificates.create({
            data,
        });
        return certificate;
    },
    updateCertificate: async (_, { id, data }) => {
        const certificate = await prisma.certificates.update({
            where: {
                id: id,
            },
            data,
        });
        return certificate;
    },
    deleteCertificate: async (_, { id }) => {
        const certificate = await prisma.certificates.delete({
            where: {
                id: id,
            },
        });
        return certificate;
    },
}

const certificatesRelations = {
    Certificates: {
        student: async (parent) => {
            return await prisma.student.findUnique({
              where: {
                studentId: parent.studentId,
              },
            });
          },
    },
}

module.exports = {
    certificatesQuery,
    certificatesMutation,
    certificatesRelations,
}