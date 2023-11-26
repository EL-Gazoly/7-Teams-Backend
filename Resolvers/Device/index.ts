import prisma from "../../config/database";

type CreateDeviceInput = {
    name: string
    macAddress: string
    userId: string
  
  }
  
  type UpdateDeviceInput =  {
    name?: string
    macAddress?: string
    userId?: string
  }

const deviceQuery = {
  devices: async () => {
    return await prisma.device.findMany();
  },
  device: async (_ : undefined, args : {id : string}) => {
    return await prisma.device.findUnique({
      where: {
        deviceId: args.id,
      },
    });
  },
};

const deviceMutation = {
    createDevice : async (_  : undefined, args : {data :CreateDeviceInput}) =>{
        return await prisma.device.create({
            data : args.data
        })    
    },
    updateDevice : async (_ : undefined, args : {id : string, data : UpdateDeviceInput}) =>{
        return await prisma.device.update({
            where : {
                deviceId : args.id
            },
            data : args.data
        })
    },
    deleteDevice : async (_ : undefined, args : {id : string}) =>{
        return await prisma.device.delete({
            where : {
                deviceId : args.id
            }
        })
    } 
};

export { deviceQuery, deviceMutation };