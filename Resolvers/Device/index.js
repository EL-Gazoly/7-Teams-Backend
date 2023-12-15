const prisma = require("../../config/database");

const deviceQuery = {
  devices: async () => {
    return await prisma.device.findMany();
  },
  device: async (_parent, args) => {
    return await prisma.device.findUnique({
      where: {
        deviceId: args.id,
      },
    });
  },
  deviceByMac: async (_parent, args) => {
    return await prisma.device.findUnique({
      where: {
        macAddress: args.macAddress,
      },
    });
  },
};

const deviceMutation = {
  createDevice: async (_parent, { data }) => {
    return await prisma.device.create({
      data,
    });
  },
  updateDevice: async (_parent, { id, data }) => {
    return await prisma.device.update({
      where: {
        deviceId: id,
      },
      data,
    });
  },
  deleteDevice: async (_parent, { id }) => {
    return await prisma.device.delete({
      where: {
        deviceId: id,
      },
    });
  },
};

const deviceRelation = {
  Device: {
    admin: async (parent) => {
      return await prisma.admin.findUnique({
        where: {
          id: parent.adminId,
        },
      });
    },
    student: async (parent) => {
      return await prisma.student.findMany({
        where: {
          deviceId: parent.deviceId,
        },
      });
    },
  },
};

module.exports = { deviceQuery, deviceMutation, deviceRelation };
